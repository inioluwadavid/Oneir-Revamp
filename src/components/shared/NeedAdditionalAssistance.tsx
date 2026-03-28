"use client";

import SubmitTicketButton from "@/components/support/SubmitTicketButton";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { DURATION, EASE_OUT } from "@/lib/motion-variants";

export interface NeedAdditionalAssistanceTranslations {
  title: string;
  ticketCard: {
    button: string;
    description: string;
  };
  contactCard: {
    title: string;
    phone: string;
    fax: string;
    faxNumber: string;
    email: string;
    hours: string;
  };
}

interface NeedAdditionalAssistanceProps {
  translations: NeedAdditionalAssistanceTranslations;
  /** Section id for anchor links (e.g. #contact-support) */
  sectionId?: string;
}

const ASSISTANCE_GRADIENT =
  "linear-gradient(180deg, rgb(148, 44, 86) 0.75%, rgba(151, 49, 90, 0.965) 21.77%, rgba(161, 63, 101, 0.867) 46.99%, rgba(177, 86, 120, 0.7) 74.41%, rgba(200, 119, 145, 0.475) 103.33%, rgba(228, 160, 178, 0.184) 133.17%, rgba(246, 186, 199, 0) 149.71%)";

export default function NeedAdditionalAssistance({
  translations: t,
  sectionId = "contact-support",
}: NeedAdditionalAssistanceProps) {
  return (
    <section
      id={sectionId}
      className="rounded-[24px] px-6 sm:px-[96px] py-8 sm:py-[80px] lg:rounded-[32px] "
      style={{ background: ASSISTANCE_GRADIENT }}
    >
      <motion.h2
        className="mb-6 text-center text-2xl font-semibold text-white sm:mb-8 sm:text-3xl lg:mb-12 lg:text-[48px]"
        style={{ fontFamily: "var(--font-outfit)" }}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: DURATION.normal, ease: EASE_OUT }}
      >
        {t.title}
      </motion.h2>
      <div className="flex flex-col gap-8 lg:flex-row lg:items-stretch lg:justify-center lg:gap-[72px] xl:gap-[118px]">
        {/* Ticket card */}
        <motion.div
          className="flex flex-col gap-4 rounded-[24px] bg-white p-5 shadow-[0px_16px_20px_0px_rgba(0,0,0,0.01)] sm:gap-6 sm:p-8 lg:w-full lg:max-w-[450px]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: DURATION.normal, delay: 0.08, ease: EASE_OUT }}
          whileHover={{ y: -3, transition: { duration: DURATION.fast, ease: EASE_OUT } }}
        >
          <SubmitTicketButton className="w-full">
            <Image src="/images/ticket.svg" alt="" width={24} height={24} className="shrink-0" />
            {t.ticketCard.button}
          </SubmitTicketButton>
          <p className="text-sm leading-relaxed text-[#434349] sm:text-base lg:text-lg">
            {t.ticketCard.description}
          </p>
        </motion.div>

        {/* Contact card */}
        <motion.div
          className="flex flex-col gap-4 rounded-[24px] bg-white p-5 shadow-[0px_16px_20px_0px_rgba(0,0,0,0.01)] sm:gap-5 sm:p-8 lg:w-full lg:max-w-[450px]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: DURATION.normal, delay: 0.16, ease: EASE_OUT }}
          whileHover={{ y: -3, transition: { duration: DURATION.fast, ease: EASE_OUT } }}
        >
          <h3
            className="text-lg font-semibold text-[#070714] sm:text-xl lg:text-[32px]"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            {t.contactCard.title}
          </h3>
          <div className="flex flex-col gap-3 sm:gap-4">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="relative h-10 w-11 shrink-0 sm:h-11 sm:w-12">
                <Image src="/images/contacts/c1.svg" alt="" fill className="object-contain" sizes="48px" />
              </div>
              <div className="flex flex-col text-xs text-[#434349] sm:text-sm">
                <Link href="tel:4163223580" className="font-medium text-[#070714] hover:underline">
                  {t.contactCard.phone}
                </Link>
                <span>
                  {t.contactCard.fax}: {t.contactCard.faxNumber}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="relative h-10 w-11 shrink-0 sm:h-11 sm:w-12">
                <Image src="/images/contacts/c2.svg" alt="" fill className="object-contain" sizes="48px" />
              </div>
              <Link
                href="mailto:support@oneirsolutions.com"
                className="text-xs text-[#434349] hover:underline sm:text-sm"
              >
                {t.contactCard.email}
              </Link>
            </div>
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="relative h-10 w-11 shrink-0 sm:h-11 sm:w-12">
                <Image src="/images/contacts/c3.svg" alt="" fill className="object-contain" sizes="48px" />
              </div>
              <span className="text-xs text-[#434349] sm:text-sm">{t.contactCard.hours}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
