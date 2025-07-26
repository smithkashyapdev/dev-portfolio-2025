'use client';
import React, { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const contactSchema = z.object({
  name: z.string().min(2, 'Name is too short'),
  email: z.string().email('Invalid email address'),
  mobile: z.string().regex(/^[0-9]{10}$/, 'Mobile must be 10 digits'),
  job_description: z.string().min(10, 'Please describe the job in detail'),
});
export type ContactFormData = z.infer<typeof contactSchema>;

export const ContactForm = () => {
  const [status, setStatus] = useState<string | null>(null);
  const [fileBase64, setFileBase64] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = (reader.result as string).split(',')[1];
      setFileBase64(base64);
    };
    reader.readAsDataURL(file);
  };

  const onSubmit = async (data: ContactFormData) => {
    const payload = {
      ...data,
      fileName,
      fileContentBase64: fileBase64,
    };

    try {
      const res = await fetch(
        'https://83qnqjb79e.execute-api.ap-south-1.amazonaws.com/Prod/portfolio-contact-api',
        {
          method: 'POST',
          body: JSON.stringify(payload),
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      const result = await res.json();
      if (result.success) {
        setStatus('✅ Message sent successfully!');
        reset();
        setFileName(null);
        setFileBase64(null);
      } else {
        setStatus('❌ Something went wrong.');
      }
    } catch (_) {
      setStatus('❌ Failed to send. Check connection.');
    }

    setTimeout(() => setStatus(null), 3000);
  };

  return (
    <div className="p-[2px] rounded-xl bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 h-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-fit p-6 space-y-4 rounded-lg shadow-md bg-[var(--foreground)]"
      >
        <h3 className="text-2xl  font-bold">📬 Hire Me</h3>

        <input
          {...register('name')}
          placeholder="Your Name"
          className="w-full px-4 py-2 border border-gray-700 rounded"
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

        <input
          {...register('email')}
          placeholder="Your Email"
          className="w-full px-4 py-2 border border-gray-700 rounded"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

        <input
          {...register('mobile')}
          placeholder="Your Mobile"
          className="w-full px-4 py-2 border border-gray-700 rounded"
        />
        {errors.mobile && <p className="text-red-500 text-sm">{errors.mobile.message}</p>}

        <textarea
          {...register('job_description')}
          placeholder="Brief Job Description"
          rows={4}
          className="w-full px-4 py-2 border border-gray-700 rounded"
        />
        {errors.job_description && (
          <p className="text-red-500 text-sm">{errors.job_description.message}</p>
        )}

        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
          className="text-sm border border-gray-700 rounded px-4 py-2"
        />
        {fileName && <p className="text-gray-400 text-sm mt-1">📎 Attached: {fileName}</p>}

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-gradient-to-r ml-2 from-purple-500 to-pink-500  font-medium px-6 py-2 rounded hover:opacity-90 transition-all"
        >
          {isSubmitting ? 'Sending...' : '🚀 Send Message'}
        </button>

        {status && <p className="text-sm text-green-400 mt-2">{status}</p>}
      </form>
    </div>
  );
};
