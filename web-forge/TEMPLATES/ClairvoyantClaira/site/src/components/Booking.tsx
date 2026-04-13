"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { DayPicker } from "react-day-picker";
import { Calendar, Clock, Sparkles, ChevronRight } from "lucide-react";
import { format, addDays, isBefore, startOfDay } from "date-fns";

const serviceOptions = [
  { value: "tarot", label: "Tarot Reading", duration: "60 min", price: "$85" },
  {
    value: "astrology",
    label: "Astrological Charting",
    duration: "90 min",
    price: "$120",
  },
  {
    value: "dream",
    label: "Dream Interpretation",
    duration: "45 min",
    price: "$95",
  },
];

const timeSlots = [
  "10:00 AM",
  "11:30 AM",
  "1:00 PM",
  "2:30 PM",
  "4:00 PM",
  "6:00 PM",
  "7:30 PM",
];

export default function Booking() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [step, setStep] = useState(0);

  const today = startOfDay(new Date());
  const maxDate = addDays(today, 60);

  const canProceed =
    (step === 0 && selectedService) ||
    (step === 1 && selectedDate) ||
    (step === 2 && selectedTime);

  const nextStep = () => {
    if (canProceed && step < 3) setStep(step + 1);
  };

  const selectedServiceData = serviceOptions.find(
    (s) => s.value === selectedService
  );

  return (
    <section id="booking" className="py-24 sm:py-32 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <p className="text-gold/60 text-sm tracking-[0.3em] uppercase mb-4">
            Reserve Your Session
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-gold text-glow mb-4">
            When You&apos;re Ready
          </h2>
          <p className="text-foreground/50 max-w-md mx-auto">
            No pressure. No expiration. Book when the timing feels right.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="glass rounded-2xl overflow-hidden border-glow"
        >
          {/* Progress Steps */}
          <div className="flex border-b border-gold/10">
            {["Service", "Date", "Time", "Confirm"].map((label, i) => (
              <button
                key={label}
                onClick={() => {
                  if (i < step) setStep(i);
                }}
                className={`flex-1 py-4 text-xs sm:text-sm tracking-wide transition-all duration-300 ${
                  i === step
                    ? "text-gold border-b-2 border-gold bg-gold/5"
                    : i < step
                      ? "text-gold/50 cursor-pointer hover:text-gold/70"
                      : "text-foreground/30 cursor-default"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="p-6 sm:p-8 min-h-[400px] flex flex-col">
            {/* Step 0: Service Selection */}
            {step === 0 && (
              <div className="flex-1 space-y-3">
                {serviceOptions.map((service) => (
                  <button
                    key={service.value}
                    onClick={() => setSelectedService(service.value)}
                    className={`w-full flex items-center justify-between p-4 sm:p-5 rounded-xl border transition-all duration-300 text-left ${
                      selectedService === service.value
                        ? "border-gold/40 bg-gold/10"
                        : "border-gold/10 hover:border-gold/20 hover:bg-gold/5"
                    }`}
                  >
                    <div>
                      <p className="text-gold font-serif text-lg">
                        {service.label}
                      </p>
                      <p className="text-foreground/40 text-sm mt-1">
                        {service.duration}
                      </p>
                    </div>
                    <span className="text-gold/60 text-sm font-medium">
                      {service.price}
                    </span>
                  </button>
                ))}
              </div>
            )}

            {/* Step 1: Date Selection */}
            {step === 1 && (
              <div className="flex-1 flex justify-center">
                <DayPicker
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) =>
                    isBefore(date, today) ||
                    isBefore(maxDate, date) ||
                    date.getDay() === 0
                  }
                  classNames={{
                    root: "text-foreground/80",
                    months: "flex flex-col",
                    month_caption:
                      "font-serif text-gold text-lg text-center mb-4",
                    nav: "flex items-center justify-between mb-2",
                    button_previous:
                      "text-gold/50 hover:text-gold transition-colors p-1",
                    button_next:
                      "text-gold/50 hover:text-gold transition-colors p-1",
                    weekdays: "grid grid-cols-7 mb-2",
                    weekday:
                      "text-gold/40 text-xs text-center font-medium uppercase",
                    weeks: "",
                    week: "grid grid-cols-7",
                    day: "p-0 text-center",
                    day_button:
                      "w-10 h-10 rounded-full text-sm hover:bg-gold/10 hover:text-gold transition-all disabled:opacity-20 disabled:cursor-not-allowed disabled:hover:bg-transparent",
                    selected:
                      "!bg-gold/20 !text-gold border border-gold/40 rounded-full",
                    today: "font-bold text-gold",
                    disabled: "opacity-20",
                  }}
                />
              </div>
            )}

            {/* Step 2: Time Selection */}
            {step === 2 && (
              <div className="flex-1">
                <p className="text-foreground/50 text-sm mb-6 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gold/50" />
                  {selectedDate && format(selectedDate, "EEEE, MMMM d, yyyy")}
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl border text-sm transition-all duration-300 ${
                        selectedTime === time
                          ? "border-gold/40 bg-gold/10 text-gold"
                          : "border-gold/10 text-foreground/60 hover:border-gold/20 hover:bg-gold/5"
                      }`}
                    >
                      <Clock className="w-3.5 h-3.5" />
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Confirmation */}
            {step === 3 && (
              <div className="flex-1 flex flex-col items-center justify-center text-center py-8">
                <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mb-6">
                  <Sparkles className="w-8 h-8 text-gold" />
                </div>
                <h3 className="font-serif text-2xl text-gold mb-4">
                  Your Session Awaits
                </h3>
                <div className="space-y-2 text-foreground/60 text-sm mb-8">
                  <p>{selectedServiceData?.label}</p>
                  <p>
                    {selectedDate && format(selectedDate, "EEEE, MMMM d, yyyy")}
                  </p>
                  <p>{selectedTime}</p>
                  <p className="text-gold/50 font-medium">
                    {selectedServiceData?.price}
                  </p>
                </div>
                <p className="text-foreground/40 text-xs max-w-sm">
                  This is a demo booking interface. In production, this would
                  connect to a scheduling and payment system.
                </p>
              </div>
            )}

            {/* Navigation */}
            {step < 3 && (
              <div className="flex justify-between items-center mt-8 pt-6 border-t border-gold/10">
                <button
                  onClick={() => setStep(Math.max(0, step - 1))}
                  className={`text-sm text-foreground/40 hover:text-foreground/60 transition-colors ${step === 0 ? "invisible" : ""}`}
                >
                  Back
                </button>
                <button
                  onClick={nextStep}
                  disabled={!canProceed}
                  className="flex items-center gap-2 px-6 py-3 bg-gold/10 text-gold border border-gold/30 rounded-full text-sm font-medium hover:bg-gold/20 hover:border-gold/50 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300"
                >
                  Continue
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
