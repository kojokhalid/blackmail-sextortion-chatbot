import TextReveal from "@/components/ui/text-reveal";
interface Prop {
  text: string;
}
export function TextRevealDemo({ text }: Prop) {
  return (
    <div className="text-white">
      <TextReveal text={text} />
    </div>
  );
}
