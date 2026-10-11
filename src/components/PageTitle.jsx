export default function PageTitle({ title, subtitle, badge }) {
  return (
    <div>
      <h1 className="font-display text-4xl font-semibold leading-[1.12] md:text-5xl">
        {badge && <span className="mr-3 align-middle">{badge}</span>}
        {title}
      </h1>
      {subtitle && (
        <p className="mt-4 max-w-xl text-[15px] text-muted md:text-base">
          {subtitle}
        </p>
      )}
    </div>
  );
}
