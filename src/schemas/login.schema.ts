import z from "zod";

export const loginSchema = z.object({
  username: z.string().min(5, "نام کاربری حداقل باید 5 حرف باشد").lowercase(),
  password: z.string().min(8, "رمز عبور باید حداقل ۸ کاراکتر باشد."),
});
