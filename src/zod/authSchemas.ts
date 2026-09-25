import * as z from "zod";

export const registerSchema = z.object({
  login: z.string().min(1, "Логин обязателен"),
  email: z.email("Некорректная почта"),
  password: z.string().min(6, "Минимум 6 символов"),
  gender: z
    .string({ error: "Выберите пол" })
    .min(1, "Выберите пол")
    .refine((v) => ["male", "female"].includes(v), "Выберите пол"),
  age: z
    .string({ error: "Укажите ваш возраст" })
    .min(1, "Укажите ваш возраст")
    .regex(/^([1-9][0-9]?|100)$/, "Возраст от 1 до 100"),
});

export const loginSchema = z.object({
  email: z.email("Некорректная почта"),
  password: z.string().min(6, "Минимум 6 символов"),
});

export type LoginSubmit = z.infer<typeof loginSchema>;
export type RegisterSubmit = z.infer<typeof registerSchema>;
