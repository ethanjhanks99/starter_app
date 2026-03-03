'use client';

import { ProtectedRouteWithFallback } from '@/lib/auth/protected';
import { Header } from '@/components/layout/Header';
import { LogoutButton } from '@/components/auth/LogoutButton';
import Avatar from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { useAuth } from '@/lib/auth/hooks';
import { useProfile } from '@/lib/auth/useProfile';
import { createSupabaseClient } from '@/lib/supabase/client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

const MAX_AVATAR_BYTES = 5 * 1024 * 1024;
const ALLOWED_AVATAR_TYPES = ['image/png', 'image/jpeg', 'image/webp'];

export default function ProfilePage() {
  const { user, loading: authLoading } = useAuth();
  const { profile, loading: profileLoading, error: profileError, refetch } = useProfile(user?.id);

  const [fullName, setFullName] = useState('');
  const [fieldError, setFieldError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [selectedAvatarFile, setSelectedAvatarFile] = useState<File | null>(null);
  const [avatarError, setAvatarError] = useState<string | null>(null);
  const [avatarSuccess, setAvatarSuccess] = useState<string | null>(null);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (profile) {
      setFullName(profile.full_name ?? '');
    }
  }, [profile]);

  const validateFullName = (value: string): string | null => {
    const normalized = value.trim();

    if (!normalized) {
      return 'Full name is required.';
    }

    if (normalized.length < 2) {
      return 'Full name must be at least 2 characters.';
    }

    if (normalized.length > 80) {
      return 'Full name must be 80 characters or fewer.';
    }

    return null;
  };

  const getInitials = () => {
    if (profile?.full_name) {
      return profile.full_name
        .split(' ')
        .map((namePart) => namePart[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
    }

    if (profile?.email) {
      return profile.email[0].toUpperCase();
    }

    return '?';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user) {
      setSubmitError('You must be signed in to update your profile.');
      return;
    }

    const validationError = validateFullName(fullName);
    if (validationError) {
      setFieldError(validationError);
      return;
    }

    setFieldError(null);
    setSubmitError(null);
    setSuccessMessage(null);
    setSaving(true);

    try {
      const supabase = createSupabaseClient();
      const normalizedName = fullName.trim();

      const { error } = await supabase
        .from('profiles')
        .update({ full_name: normalizedName })
        .eq('id', user.id);

      if (error) {
        throw new Error(error.message);
      }

      await refetch();
      setSuccessMessage('Profile updated successfully.');
      setFullName(normalizedName);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to update profile.';
      setSubmitError(message);
    } finally {
      setSaving(false);
    }
  };

  const validateAvatarFile = (file: File): string | null => {
    if (!ALLOWED_AVATAR_TYPES.includes(file.type)) {
      return 'Please upload a PNG, JPEG, or WebP image.';
    }

    if (file.size > MAX_AVATAR_BYTES) {
      return 'Avatar image must be 5MB or smaller.';
    }

    return null;
  };

  const getFileExtension = (file: File): string => {
    const filenameParts = file.name.split('.');
    const fromName = filenameParts.length > 1 ? filenameParts[filenameParts.length - 1].toLowerCase() : '';

    if (fromName === 'jpg') {
      return 'jpeg';
    }

    if (fromName === 'png' || fromName === 'jpeg' || fromName === 'webp') {
      return fromName;
    }

    if (file.type === 'image/png') {
      return 'png';
    }

    if (file.type === 'image/webp') {
      return 'webp';
    }

    return 'jpeg';
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;

    setAvatarError(null);
    setAvatarSuccess(null);

    if (!file) {
      setSelectedAvatarFile(null);
      return;
    }

    const validationError = validateAvatarFile(file);
    if (validationError) {
      setSelectedAvatarFile(null);
      setAvatarError(validationError);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      return;
    }

    setSelectedAvatarFile(file);
  };

  const handleAvatarUpload = async () => {
    if (!user) {
      setAvatarError('You must be signed in to upload an avatar.');
      return;
    }

    if (!selectedAvatarFile) {
      setAvatarError('Please choose an avatar image to upload.');
      return;
    }

    const validationError = validateAvatarFile(selectedAvatarFile);
    if (validationError) {
      setAvatarError(validationError);
      return;
    }

    setAvatarError(null);
    setAvatarSuccess(null);
    setUploadingAvatar(true);

    try {
      const supabase = createSupabaseClient();
      const extension = getFileExtension(selectedAvatarFile);
      const filePath = `${user.id}/avatar-${Date.now()}.${extension}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, selectedAvatarFile, {
          cacheControl: '3600',
          upsert: true,
          contentType: selectedAvatarFile.type,
        });

      if (uploadError) {
        throw new Error(uploadError.message);
      }

      const { data: publicUrlData } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      const { error: profileUpdateError } = await supabase
        .from('profiles')
        .update({ avatar_url: publicUrlData.publicUrl })
        .eq('id', user.id);

      if (profileUpdateError) {
        throw new Error(profileUpdateError.message);
      }

      await refetch();
      setSelectedAvatarFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      setAvatarSuccess('Avatar uploaded successfully.');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to upload avatar.';
      setAvatarError(message);
    } finally {
      setUploadingAvatar(false);
    }
  };

  if (authLoading || profileLoading) {
    return (
      <ProtectedRouteWithFallback>
        <Header>
          <div className="nav-row">
            <Link href="/dashboard" className="nav-link">
              Dashboard
            </Link>
            <LogoutButton />
          </div>
        </Header>
        <div className="page-container max-w-2xl py-10">
          <Card>
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-[var(--border)] rounded w-1/3"></div>
              <div className="h-4 bg-[var(--border)] rounded"></div>
              <div className="h-10 bg-[var(--border)] rounded"></div>
              <div className="h-10 bg-[var(--border)] rounded"></div>
            </div>
          </Card>
        </div>
      </ProtectedRouteWithFallback>
    );
  }

  return (
    <ProtectedRouteWithFallback>
      <Header>
        <div className="nav-row">
          <Link href="/dashboard" className="nav-link">
            Dashboard
          </Link>
          <LogoutButton />
        </div>
      </Header>
      <div className="page-container max-w-2xl py-10">
        <Card>
          <h1 className="page-title mb-6">Edit Profile</h1>

          {profileError && (
            <div className="status status-error mb-6">
              Failed to load profile: {profileError.message}
            </div>
          )}

          {profile && (
            <div className="card-tight mb-6">
              <div className="flex items-center gap-4">
                <Avatar
                  src={profile.avatar_url}
                  alt={profile.full_name || profile.email}
                  initials={getInitials()}
                  size="md"
                />
                <div>
                  <p className="muted-text">Email</p>
                  <p className="font-medium break-all">{profile.email}</p>
                  <p className="muted-text mt-1">
                    Last updated: {formatDate(profile.updated_at)}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="card-tight mb-6 space-y-3">
            <h2 className="section-title text-lg">Avatar</h2>
            <p className="muted-text">Upload a PNG, JPEG, or WebP image up to 5MB.</p>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg,image/webp"
              onChange={handleAvatarChange}
              className="file-input"
            />
            {selectedAvatarFile && (
              <p className="muted-text">
                Selected file: {selectedAvatarFile.name}
              </p>
            )}
            {avatarError && (
              <div className="status status-error">
                {avatarError}
              </div>
            )}
            {avatarSuccess && (
              <div className="status status-success">
                {avatarSuccess}
              </div>
            )}
            <Button
              type="button"
              onClick={handleAvatarUpload}
              disabled={uploadingAvatar || !selectedAvatarFile || !profile}
              className="w-full"
            >
              {uploadingAvatar ? 'Uploading...' : 'Upload Avatar'}
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Full Name"
              type="text"
              placeholder="Your full name"
              value={fullName}
              onChange={(e) => {
                setFullName(e.target.value);
                if (fieldError) {
                  setFieldError(null);
                }
              }}
              error={fieldError ?? undefined}
            />

            {submitError && (
              <div className="status status-error">
                {submitError}
              </div>
            )}

            {successMessage && (
              <div className="status status-success">
                {successMessage}
              </div>
            )}

            <Button type="submit" disabled={saving || !profile} className="w-full">
              {saving ? 'Saving...' : 'Save Changes'}
            </Button>
          </form>
        </Card>
      </div>
    </ProtectedRouteWithFallback>
  );
}
