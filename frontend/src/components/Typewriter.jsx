import Typewriter from 'typewriter-effect';

export default function TypewriterComponent() {
  return (
    <div className="font-dm-serif pt-16 text-center text-4xl sm:text-5xl lg:text-6xl">
      <div className="text-black drop-shadow-lg">
        <Typewriter
          options={{
            strings: ['Your blood there HOPE!', 'Join Thousand Of Active Donors.', "You Don't have to be Doctor to SAVE Life."],
            autoStart: true,
            loop: true,
            delay: 75,
          }}
        />
      </div>
    </div>
  );
}