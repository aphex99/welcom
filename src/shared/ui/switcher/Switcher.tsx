import { useThemeStore } from "@/app/providers/theme/store";

const Switcher = () => {
  const switchTheme = useThemeStore((state) => state.switchTheme);

  const onChangeCheckbox = () => switchTheme();

  return (
    <label className={"inline-flex items-center cursor-pointer gap-3"}>
      <input
        type="checkbox"
        className="sr-only peer"
        onChange={onChangeCheckbox}
      />
      <div
        className="relative w-9 h-5 bg-zinc-400 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:content-[''] after:absolute after:top-0.5 after:inset-s-0.5 after:bg-white after:rounded-full after:h-4 after:w-4
      after:transition-all
      after:duration-700 after:ease-spring-soft
      peer-checked:bg-blue-400"
      ></div>
      <span>light</span>
    </label>
  );
};

export default Switcher;
