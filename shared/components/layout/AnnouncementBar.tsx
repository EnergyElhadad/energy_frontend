type Props = {
  text: string;
}

const AnnouncementBar = ({ text }: Props) => {
  return (
    <div className="w-full flex items-center justify-center bg-primary py-[6px] h-[39px] text-center text-[14px] text-white">
      {text}
    </div>
  )
}

export default AnnouncementBar