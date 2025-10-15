'use client';
import { authService } from '@/modules/auth/services/authService';
import { useAuthStore } from '@/modules/auth/store/authStore'
import { useRouter } from 'next/navigation';

const LogoutButton = () => {
  const { logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    } finally {
      logout();
      router.push('/auth/login');
    }
  }
  return (
    <button
      onClick={handleLogout}
       className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md font-semibold transition"
    >
      Cerrar sesión
    </button>
  )
}

export default LogoutButton