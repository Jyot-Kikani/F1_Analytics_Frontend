"use client";
import CarScene from "@/components/CarScene";

export default function Home() {
  return (
    <div className="container mx-auto p-12 h-[3000px]">
      <section className="md-hidden h-screen flex items-center justify-center fixed w-full md:w-[60%] top-0 right-0 z-10">
        <CarScene />
      </section>
      <h1 className="text-3xl font-bold mb-6">Welcome to F1 Analytics</h1>
      <p className="text-gray-700">
        Your one-stop solution for all F1 data analysis needs.
      </p>
    </div>
  );
}

