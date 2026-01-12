import React from "react";

const NewsletterSignup: React.FC = () => {
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <section className="py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-4 grid gap-10 lg:gap-14 lg:grid-cols-2 items-center">
        <div className="flex justify-center lg:justify-start">
          <img
            src="/pizzas/1.png"
            alt="Rotating pizza"
            className="w-56 sm:w-72 md:w-80 lg:w-[420px] rounded-full drop-shadow-xl
                       animate-[spin_300s_linear_infinite] motion-reduce:animate-none"
          />
        </div>

        <div>
          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight text-dark">
            Delicious Deals,<br /> Just for You
          </h2>

          <p className="mt-4 text-dark">
            Sign up for our newsletter and receive <br /> exclusive offers on new pizzas!
          </p>

          <form onSubmit={onSubmit} className="mt-6 sm:flex sm:items-center sm:gap-3 space-y-3 sm:space-y-0">
            <input
              type="email"
              required
              placeholder="youremail@email.com"
              className="w-full rounded-full border border-black/10 bg-white/90
                         px-5 py-3 text-dark placeholder-foreground-d
                         focus:outline-none focus:ring-2 focus:ring-fire-red"
              aria-label="Email address"
            />
            <button
              type="submit"
              className="inline-flex justify-center rounded-full bg-fire-red px-6 py-3
                         text-white font-semibold hover:bg-dark transition"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSignup;
