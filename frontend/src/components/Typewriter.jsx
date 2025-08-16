import Typewriter from 'typewriter-effect';

export default function TypewriterComponent() {
  return (
    <div className="font-sans text-center">
      <div className="text-2xl md:text-3xl font-medium text-gray-700 mb-4">
        <Typewriter
          options={{
            strings: [
              'Your blood gives HOPE! 💉',
              'Join thousands of active donors 🩸',
              "You don't have to be a doctor to SAVE a life ❤️",
              'Every drop counts, every donor matters 🏥',
              'Be the reason someone smiles today 😊'
            ],
            autoStart: true,
            loop: true,
            delay: 75,
            deleteSpeed: 50,
            cursor: '|',
            cursorClassName: 'text-red-500 font-bold'
          }}
        />
      </div>
    </div>
  );
}