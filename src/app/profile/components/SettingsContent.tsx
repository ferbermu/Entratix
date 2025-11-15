'use client';

import React, { useState, useEffect } from 'react';
import { Bell, Shield, CaretDown } from '@phosphor-icons/react';
import { useAuthRedux } from '../../login/hooks/useAuthRedux';
import { getUserProfile, updateUserSettings } from '../../actions/profile';

export const SettingsContent = () => {
  const { user: authUser } = useAuthRedux();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    profileVisibility: 'Public' as 'Public' | 'Private' | 'Friends Only',
    dataSharing: true,
  });

  // Cargar configuración del usuario
  useEffect(() => {
    const fetchSettings = async () => {
      if (!authUser?.id) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        const result = await getUserProfile(authUser.id);
        if (result.success && result.user) {
          setSettings({
            emailNotifications: result.user.emailNotifications,
            smsNotifications: result.user.smsNotifications,
            pushNotifications: result.user.pushNotifications,
            profileVisibility: result.user.profileVisibility as 'Public' | 'Private' | 'Friends Only',
            dataSharing: result.user.dataSharing,
          });
        }
      } catch (error) {
        console.error('Error loading settings:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSettings();
  }, [authUser]);

  const handleToggle = async (setting: string) => {
    if (!authUser?.id || isSaving) return;

    const newValue = !settings[setting as keyof typeof settings];
    
    // Actualizar UI optimistamente
    setSettings(prev => ({
      ...prev,
      [setting]: newValue,
    }));

    setIsSaving(true);
    try {
      const result = await updateUserSettings({
        userId: authUser.id,
        [setting]: newValue,
      });

      if (!result.success) {
        // Revertir si falla
        setSettings(prev => ({
          ...prev,
          [setting]: !newValue,
        }));
        alert(result.message || 'Error al actualizar la configuración');
      }
    } catch (error) {
      console.error('Error updating setting:', error);
      // Revertir si falla
      setSettings(prev => ({
        ...prev,
        [setting]: !newValue,
      }));
      alert('Error al actualizar la configuración');
    } finally {
      setIsSaving(false);
    }
  };

  const handleVisibilityChange = async (value: string) => {
    if (!authUser?.id || isSaving) return;

    const oldValue = settings.profileVisibility;
    
    // Actualizar UI optimistamente
    setSettings(prev => ({
      ...prev,
      profileVisibility: value as 'Public' | 'Private' | 'Friends Only',
    }));

    setIsSaving(true);
    try {
      const result = await updateUserSettings({
        userId: authUser.id,
        profileVisibility: value as 'Public' | 'Private' | 'Friends Only',
      });

      if (!result.success) {
        // Revertir si falla
        setSettings(prev => ({
          ...prev,
          profileVisibility: oldValue,
        }));
        alert(result.message || 'Error al actualizar la configuración');
      }
    } catch (error) {
      console.error('Error updating visibility:', error);
      // Revertir si falla
      setSettings(prev => ({
        ...prev,
        profileVisibility: oldValue,
      }));
      alert('Error al actualizar la configuración');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-white text-xl">Cargando configuración...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Notification Preferences Card */}
      <div className="bg-[#1C1A1A] border border-[#3BAFBB40] rounded-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <Bell size={24} className="text-[#3BAFBB]" />
          <h3 className="text-xl font-semibold text-white">
            Notification Preferences
          </h3>
        </div>

        <div className="space-y-4">
          {/* Email Notifications */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-medium">Email Notifications</p>
              <p className="text-gray-400 text-sm">
                Receive updates about your tickets and events
              </p>
            </div>
            <button
              onClick={() => handleToggle('emailNotifications')}
              className={`cursor-pointer relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.emailNotifications ? 'bg-[#3BAFBB]' : 'bg-gray-600'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.emailNotifications
                    ? 'translate-x-6'
                    : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* SMS Notifications */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-medium">SMS Notifications</p>
              <p className="text-gray-400 text-sm">
                Get text messages for important updates
              </p>
            </div>
            <button
              onClick={() => handleToggle('smsNotifications')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                settings.smsNotifications ? 'bg-[#3BAFBB]' : 'bg-gray-600'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.smsNotifications ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Push Notifications */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-medium">Push Notifications</p>
              <p className="text-gray-400 text-sm">
                Browser notifications for real-time updates
              </p>
            </div>
            <button
              onClick={() => handleToggle('pushNotifications')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                settings.pushNotifications ? 'bg-[#3BAFBB]' : 'bg-gray-600'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.pushNotifications ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Privacy & Security Card */}
      <div className="bg-[#1C1A1A] border border-[#3BAFBB40] rounded-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <Shield size={24} className="text-[#3BAFBB]" />
          <h3 className="text-xl font-semibold text-white">
            Privacy & Security
          </h3>
        </div>

        <div className="space-y-4">
          {/* Profile Visibility */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-medium">Profile Visibility</p>
              <p className="text-gray-400 text-sm">
                Make your profile visible to other users
              </p>
            </div>
            <div className="relative">
              <select
                value={settings.profileVisibility}
                onChange={e => handleVisibilityChange(e.target.value)}
                className="appearance-none cursor-pointer bg-[#1C2530] border border-[#3BAFBB40] rounded-lg px-4 py-2 pr-10 text-white focus:outline-none focus:border-[#3BAFBB]"
              >
                <option value="Public">Public</option>
                <option value="Private">Private</option>
                <option value="Friends Only">Friends Only</option>
              </select>
              <CaretDown
                size={16}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none "
              />
            </div>
          </div>

          {/* Data Sharing */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-medium">Data Sharing</p>
              <p className="text-gray-400 text-sm">
                Allow anonymous analytics to improve our service
              </p>
            </div>
            <button
              onClick={() => handleToggle('dataSharing')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.dataSharing ? 'bg-[#3BAFBB]' : 'bg-gray-600'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.dataSharing ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
