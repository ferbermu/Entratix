'use client';

import React, { useState } from 'react';
import { Lock, Eye, EyeSlash, SignOut } from '@phosphor-icons/react';
import { useAuthRedux } from '../../login/hooks/useAuthRedux';
import { changeUserPassword } from '../../actions/profile';

export const SecurityContent = () => {
  const { user: authUser, logout } = useAuthRedux();
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: '',
  });
  const [isChanging, setIsChanging] = useState(false);

  const handlePasswordChange = async () => {
    if (!authUser?.id) return;

    // Validaciones
    if (!passwords.current || !passwords.new || !passwords.confirm) {
      alert('Por favor completa todos los campos');
      return;
    }

    if (passwords.new !== passwords.confirm) {
      alert('Las contraseñas nuevas no coinciden');
      return;
    }

    if (passwords.new.length < 8) {
      alert('La nueva contraseña debe tener al menos 8 caracteres');
      return;
    }

    setIsChanging(true);
    try {
      const result = await changeUserPassword({
        userId: authUser.id,
        currentPassword: passwords.current,
        newPassword: passwords.new,
      });

      if (result.success) {
        alert('Contraseña actualizada exitosamente');
        // Limpiar campos
        setPasswords({
          current: '',
          new: '',
          confirm: '',
        });
      } else {
        alert(result.message || 'Error al cambiar la contraseña');
      }
    } catch (error) {
      console.error('Error changing password:', error);
      alert('Error al cambiar la contraseña');
    } finally {
      setIsChanging(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Change Password Section */}
      <div className="bg-[#1C1A1A] border border-[#3BAFBB40] rounded-xl p-8">
        <h2 className="text-xl font-bold flex items-center gap-2 mb-6">
          <Lock size={24} className="text-[#3BAFBB]" />
          Change Password
        </h2>

        {/* Current Password */}
        <div className="mb-4">
          <label className="block text-sm mb-2">Current Password</label>
          <div className="relative">
            <input
              type={showPassword.current ? 'text' : 'password'}
              placeholder="Enter current password"
              value={passwords.current}
              onChange={(e) => setPasswords(prev => ({ ...prev, current: e.target.value }))}
              disabled={isChanging}
              className="w-full bg-[#2A2A2A] border border-[#3BAFBB40] rounded-lg px-4 py-3 pr-10 text-sm outline-none focus:border-[#3BAFBB] disabled:opacity-50"
            />
            <button
              type="button"
              className="absolute right-3 top-3 text-gray-400"
              onClick={() =>
                setShowPassword({
                  ...showPassword,
                  current: !showPassword.current,
                })
              }
            >
              {showPassword.current ? (
                <EyeSlash size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>
          </div>
        </div>

        {/* New Password */}
        <div className="mb-4">
          <label className="block text-sm mb-2">New Password</label>
          <div className="relative">
            <input
              type={showPassword.new ? 'text' : 'password'}
              placeholder="Enter new password"
              value={passwords.new}
              onChange={(e) => setPasswords(prev => ({ ...prev, new: e.target.value }))}
              disabled={isChanging}
              className="w-full bg-[#2A2A2A] border border-[#3BAFBB40] rounded-lg px-4 py-3 pr-10 text-sm outline-none focus:border-[#3BAFBB] disabled:opacity-50"
            />
            <button
              type="button"
              className="absolute right-3 top-3 text-gray-400"
              onClick={() =>
                setShowPassword({ ...showPassword, new: !showPassword.new })
              }
            >
              {showPassword.new ? <EyeSlash size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div className="mb-6">
          <label className="block text-sm mb-2">Confirm New Password</label>
          <div className="relative">
            <input
              type={showPassword.confirm ? 'text' : 'password'}
              placeholder="Confirm new password"
              value={passwords.confirm}
              onChange={(e) => setPasswords(prev => ({ ...prev, confirm: e.target.value }))}
              disabled={isChanging}
              className="w-full bg-[#2A2A2A] border border-[#3BAFBB40] rounded-lg px-4 py-3 pr-10 text-sm outline-none focus:border-[#3BAFBB] disabled:opacity-50"
            />
            <button
              type="button"
              className="absolute right-3 top-3 text-gray-400"
              onClick={() =>
                setShowPassword({
                  ...showPassword,
                  confirm: !showPassword.confirm,
                })
              }
            >
              {showPassword.confirm ? (
                <EyeSlash size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>
          </div>
        </div>

        <button 
          onClick={handlePasswordChange}
          disabled={isChanging}
          className="bg-[#3BAFBB] hover:bg-[#3BAFBB]/80 text-white font-medium px-6 py-3 rounded-lg transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isChanging ? 'Actualizando...' : 'Update Password'}
        </button>
      </div>

      {/* Account Actions Section */}
      <div className="bg-[#1C1A1A] border border-[#3BAFBB40] rounded-xl p-8">
        <h2 className="text-xl font-bold mb-6">Account Actions</h2>
        <button 
          onClick={logout}
          className="bg-[#3BAFBB]/10 hover:bg-[#3BAFBB]/20 flex items-center gap-2 text-white px-6 py-3 rounded-lg transition cursor-pointer"
        >
          <SignOut size={20} />
          Sign Out
        </button>
      </div>
    </div>
  );
};
