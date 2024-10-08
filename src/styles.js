const mainTransition = "transition-all duration-500 ease-in-out"

const styles = {
    outerWrapper: "py-2 md:py-2 h-auto",
    wrapper: "max-w-[1200px] mx-auto",
    heroSidePseudoElement: "before:content-[''] before:h-[55%] md:before:h-full  before:w-1/4 md:before:w-2/5 before:bg-primary before:opacity-90 before:absolute before:right-0 before:top-0 before:z-[-10]",
    sidePseudoElement: "h-[100%] md:h-full  w-1/4 md:w-2/5 bg-primary opacity-90 absolute right-0 top-0 z-[-10]",

    heading1: "text-5xl sm:text-6xl md:text-7xl font-bold",
    heading2: "text-4xl sm:text-5xl md:text-6xl font-bold",
    heading3: "text-3xl sm:text-4xl md:text-5xl font-semibold",
    heading4: "text-2xl sm:text-3xl md:text-4xl font-semibold",
    heading5: "text-xl sm:text-2xl md:text-3xl font-medium",
    heading6: "text-lg sm:text-xl md:text-2xl font-medium",
    paragraph1: "text-lg sm:text-xl md:text-2xl font-medium max-w-[60ch]",
    paragraph2: "text-base sm:text-lg md:text-xl font-medium max-w-[60ch]",
    paragraph3: "text-sm sm:text-base md:text-lg max-w-[60ch]",
    paragraph4: "text-xs sm:text-sm md:text-base max-w-[60ch]",

    inputLabel: "text-xl flex flex-col gap-1",

    input: "w-full py-1 px-3 outline outline-solid outline-gray-200 focus:outline focus:outline-solid focus:outline-gray-200 rounded-sm",

    primaryButton: `bg-twitter-blue font-medium  px-4 py-1 rounded-full`,
    secondaryButton: `bg-dark-black font-medium  px-4 py-1 rounded-full`,
    ghostButton: "bg-transparent font-medium  px-4 py-1 rounded-full border-[.1px] border-solid border-dark-gray",

    transition500: `${mainTransition}`,

    borderBottom: "border-b-[.1px] border-solid border-dark-gray",
    borderFull: "border-[.1px] border-solid border-dark-gray"
}

export default styles;