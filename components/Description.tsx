import Image from 'next/image';

export default function Description() {
  return (
    <div className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <Image
          src="/Drop/pixiefie.png"
          alt="Pixiefie Card Example"
          width={1200}
          height={800}
          className="w-full h-auto"
          priority
        />
      </div>
    </div>
  );
}
