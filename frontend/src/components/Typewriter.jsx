import Typewriter from 'typewriter-effect';

export default function TypewriterComponent() {
  return (
    <div className="font-dm-serif pt-70 text-black text-center text-5xl">
      
      <Typewriter
        options={{
          strings: ['Your blood there HOPE!', 'Join Thousand Of Active Donors.', 'You Dont have to be Doctor to SAVE Life.'],
          autoStart: true,
          loop: true,
          delay: 75,
        }}
      />
    </div>
  );
}