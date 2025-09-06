export const JoinNow = () => {
  return (
    <div className="mx-25 px-4 my-16 max-[1280px]:px-0 max-[1280px]:mx-4 bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-cyan-400/10 rounded-lg border border-pink-500/50 hover:border-cyan-400 hover:from-pink-500/20 hover:via-purple-500/20 hover:to-cyan-400/20 transition-all duration-300 shadow-[0_0_25px_rgba(255,20,147,0.3)] relative overflow-hidden">
      {/* Neon glow background effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-pink-500/5 via-purple-500/5 to-cyan-400/5 blur-xl"></div>
      <div className="absolute inset-0 border border-pink-500/20 rounded-lg"></div>

      <div className="items-center justify-center relative z-10">
        <div className="flex flex-col items-center gap-12 py-12 px-4 text-white">
          <div className="text-[42px] font-bold text-center text-transparent bg-gradient-to-r from-pink-300 via-purple-300 to-cyan-300 bg-clip-text relative">
            Join Us as a Partner
            {/* Neon glow effect */}
            <div className="absolute inset-0 text-pink-400 blur-sm opacity-40">
              Join Us as a Partner
            </div>
          </div>
          <p className="text-[20px] text-center max-w-2xl mx-auto px-4 text-cyan-200 font-light">
            Expand your business by selling with us. Join our partner program
            for increased visibility and sales opportunities.
          </p>
          <button className="text-[20px] border-2 border-[#3BAFBB] rounded-lg bg-[#3BAFBB] hover:bg-[#3BAFBB] h-14 w-48 cursor-pointer font-semibold transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,175,187,1.0)] hover:drop-shadow-[0_0_15px_rgba(59,175,187,0.8)] relative overflow-hidden">
            <span className="relative z-10">Join Now!</span>
            {/* Intense neon glow effect */}
            <div className="absolute inset-0 bg-[#3BAFBB] opacity-0 hover:opacity-20 blur-sm transition-opacity duration-300"></div>
            <div className="absolute -inset-1 bg-gradient-to-r from-[#3BAFBB] to-[#3BAFBB] opacity-0 hover:opacity-30 blur-md transition-opacity duration-300"></div>
          </button>
        </div>
      </div>
    </div>
  );
};
