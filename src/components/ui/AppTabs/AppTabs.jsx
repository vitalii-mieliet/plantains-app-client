import clsx from 'clsx';
import css from './AppTabs.module.css';

const AppTabs = ({
  options = [],
  value,
  onChange,
  variant = 'contained',
  type = 'button',
  className,
  ...props
}) => {
  return (
    <div
      className={clsx(css.group, css[variant], className)}
      role="radiogroup"
      {...props}
    >
      {options.map((option) => {
        const isActive = value === option.value;
        const classes = clsx(css.base, css[variant], isActive && css.active);

        if (type === 'link') {
          return (
            <a
              key={option.value}
              role="radio"
              aria-checked={isActive}
              className={classes}
              href={option.href || '#'}
              onClick={(e) => {
                e.preventDefault();
                onChange?.(option.value);
              }}
            >
              {option.label}
            </a>
          );
        }

        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={isActive}
            className={classes}
            onClick={() => onChange?.(option.value)}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
};
export default AppTabs;
//  фільтри
//  <section>
//    <AppTabs
//      options={[
//        { label: "Всі історії", value: "all" },
//        { label: "Європа", value: "eu" },
//        { label: "Азія", value: "asia" },
//        { label: "Пустелі", value: "desert" },
//        { label: "Африка", value: "africa" },
//      ]}
//      value={filter}
//      onChange={setFilter}
//      variant="outlined"
//    />
//  </section>;

//  таби
//  <section>
//    <AppTabs
//      options={[
//        { label: "Збережені історії", value: "all" },
//        { label: "Мої історії", value: "saved" },
//      ]}
//      value={tab}
//      onChange={setTab}
//      variant="contained"
//    />
//  </section>;
