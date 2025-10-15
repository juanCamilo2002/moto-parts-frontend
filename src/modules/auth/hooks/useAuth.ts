import { useMutation, useQuery } from "@tanstack/react-query";
import { authService } from "../services/authService";
import { useAuthStore } from "../store/authStore";
import { useEffect } from "react";

export const useAuth = () => {
  const { setUser, logout, user } = useAuthStore();

  const loginMutation = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      authService.login(email, password),
    onSuccess: (data) => {
      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);
    },
  });

  const hasToken = typeof window !== "undefined" && !!localStorage.getItem("access");

  const { data: profile, isSuccess } = useQuery({
    queryKey: ["profile"],
    queryFn: authService.getProfile,
    enabled: hasToken,
  });

  useEffect(() => {
    if (isSuccess && profile) setUser(profile);
  }, [isSuccess, profile, setUser]);

  return { loginMutation, user, logout, profile };
};
