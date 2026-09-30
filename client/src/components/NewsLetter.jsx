const NewsLetter = () => {
    return (
        <div className="flex flex-col items-center justify-center text-center px-4 sm:px-6 space-y-2 mt-16 md:mt-24 pb-10 md:pb-14">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold">
                Never Miss a Deal!
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-gray-500/70 pb-5 md:pb-8 max-w-xl">
                Subscribe to get the latest offers, new arrivals, and exclusive discounts
            </p>

            <form className="flex w-full max-w-2xl h-11 sm:h-12 md:h-13">
                <input
                    className="border border-gray-300 outline-none w-full min-w-0 rounded-l-md px-3 sm:px-4 text-sm sm:text-base text-gray-500"
                    type="email"
                    placeholder="Enter your email"
                    required
                />

                <button
                    type="submit"
                    className="shrink-0 px-5 sm:px-8 md:px-12 h-full text-sm sm:text-base text-white bg-primary hover:bg-primary-dull transition-all cursor-pointer rounded-r-md"
                >
                    Subscribe
                </button>
            </form>
        </div>
    );
};

export default NewsLetter;