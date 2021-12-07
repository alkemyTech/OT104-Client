import style from './Title.module.css';

function Title({ children, bg, ...props }) {
  return (
    <div
      {...props}
      className={style.bg}
      style={{ backgroundImage: `url(${bg ? bg : '/images/blog-img-02.jpg'})` }}
    >
      <div className={style.container}>
        <h1 className={style.title}>{children}</h1>
      </div>
    </div>
  );
}

export default Title;
