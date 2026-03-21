"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { type Locale } from "@/lib/translations";
import { getTranslations, getNestedTranslation } from "@/lib/translations";
import Button from "@/components/ui/Button";
import FadeInOnMount from "@/components/motion/FadeInOnMount";
import { scaleFadeIn, staggerContainer, staggerItem } from "@/lib/motion-variants";

interface SignInFormProps {
  locale: Locale;
}

export default function SignInForm({ locale }: SignInFormProps) {
  const t = getTranslations(locale);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder - wire to auth when backend is ready
  };

  return (
    <section className="flex flex-col items-center gap-8 pb-16 sm:gap-10">
      <div className="flex w-full max-w-[588px] flex-col gap-8">
        <motion.div
          className="rounded-[24px] bg-white p-8 shadow-[0px_5px_12px_0px_rgba(59,89,52,0.22)] sm:p-10"
          initial="hidden"
          animate="visible"
          variants={scaleFadeIn}
        >
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-8"
            noValidate
          >
            <motion.div
              className="flex flex-col gap-6"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              <motion.h2
                className="text-[32px] font-semibold leading-normal text-[#070714]"
                style={{ fontFamily: "var(--font-outfit)" }}
                variants={staggerItem}
              >
                {getNestedTranslation(t, "signIn.title")}
              </motion.h2>
              <motion.div className="flex flex-col gap-2" variants={staggerItem}>
                <label
                  htmlFor="signin-email"
                  className="text-lg font-semibold text-[#070714]"
                  style={{ fontFamily: "var(--font-outfit)" }}
                >
                  {getNestedTranslation(t, "signIn.emailLabel")}
                </label>
                <input
                  id="signin-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={getNestedTranslation(t, "signIn.emailPlaceholder")}
                  autoComplete="email"
                  required
                  className="rounded-[16px] border-2 border-[#9b9bbd] bg-white px-4 py-3.5 text-lg text-[#3d3e3e] placeholder:text-[#9b9bbd] focus:border-[#942c56] focus:outline-none focus:ring-1 focus:ring-[#942c56] sm:py-[14px]"
                  style={{ fontFamily: "var(--font-inter)" }}
                />
              </motion.div>
              <motion.div className="flex flex-col gap-2" variants={staggerItem}>
                <label
                  htmlFor="signin-password"
                  className="text-lg font-semibold text-[#070714]"
                  style={{ fontFamily: "var(--font-outfit)" }}
                >
                  {getNestedTranslation(t, "signIn.passwordLabel")}
                </label>
                <input
                  id="signin-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={getNestedTranslation(t, "signIn.passwordPlaceholder")}
                  autoComplete="current-password"
                  required
                  className="rounded-[16px] border-2 border-[#9b9bbd] bg-white px-4 py-3.5 text-lg text-[#3d3e3e] placeholder:text-[#9b9bbd] focus:border-[#942c56] focus:outline-none focus:ring-1 focus:ring-[#942c56] sm:py-[14px]"
                  style={{ fontFamily: "var(--font-inter)" }}
                />
              </motion.div>
              <motion.div variants={staggerItem}>
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  fullWidth
                  className="rounded-[40px]"
                >
                  {getNestedTranslation(t, "signIn.continueButton")}
                </Button>
              </motion.div>
            </motion.div>
          </form>
        </motion.div>
        <FadeInOnMount delay={0.45}>
          <p className="flex items-center justify-center gap-1 text-center text-base text-[#434349]">
            {getNestedTranslation(t, "signIn.noAccount")}{" "}
            <Link
              href={`/${locale}/support`}
              className="font-normal text-[#942c56] underline decoration-[#942c56] underline-offset-2 transition-colors hover:text-[#7a2446]"
            >
              {getNestedTranslation(t, "signIn.contactUs")}
            </Link>
          </p>
        </FadeInOnMount>
      </div>
    </section>
  );
}
