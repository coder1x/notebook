import { FC, useState } from 'react';

import Props from './menuButtonType';

const MenuButton: FC<Props> = ({ onClick }) => {
  const [isActive, setIsActive] = useState(false);

  const handleButtonClick = () => {
    setIsActive(!isActive);
    onClick();
  };

  return (
    <button className="menu-button" aria-label="Меню" onClick={handleButtonClick}>
      <svg
        className={`menu-button__icon${isActive ? ' menu-button__icon_active' : ''}`}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512">
        <title>Меню</title>
        <path
          d={
            'M96 384H32C14.326 384 0 398.326 0 416V480C0 497.674 14.326 512 32 512H96C113.674 ' +
            '512 128 497.674 128 480V416C128 398.326 113.674 384 96 384ZM96 ' +
            '480H32V416H96V480ZM288 384H224C206.326 384 192 398.326 192 416V480C192 497.674 ' +
            '206.326 512 224 512H288C305.674 512 320 497.674 320 480V416C320 398.326 305.674 ' +
            '384 288 384ZM288 480H224V416H288V480ZM480 384H416C398.326 384 384 398.326 384 ' +
            '416V480C384 497.674 398.326 512 416 512H480C497.674 512 512 497.674 512 480V416C512 ' +
            '398.326 497.674 384 480 384ZM480 480H416V416H480V480ZM96 192H32C14.326 192 0 ' +
            '206.326 0 224V288C0 305.674 14.326 320 32 320H96C113.674 320 128 305.674 128 ' +
            '288V224C128 206.326 113.674 192 96 192ZM96 288H32V224H96V288ZM288 192H224C206.326 ' +
            '192 192 206.326 192 224V288C192 305.674 206.326 320 224 320H288C305.674 320 320 ' +
            '305.674 320 288V224C320 206.326 305.674 192 288 192ZM288 288H224V224H288V288ZM480 ' +
            '192H416C398.326 192 384 206.326 384 224V288C384 305.674 398.326 320 416 ' +
            '320H480C497.674 320 512 305.674 512 288V224C512 206.326 497.674 192 480 192ZM480 ' +
            '288H416V224H480V288ZM96 0H32C14.326 0 0 14.326 0 32V96C0 113.674 14.326 128 32 ' +
            '128H96C113.674 128 128 113.674 128 96V32C128 14.326 113.674 0 96 0ZM96 ' +
            '96H32V32H96V96ZM288 0H224C206.326 0 192 14.326 192 32V96C192 113.674 206.326 ' +
            '128 224 128H288C305.674 128 320 113.674 320 96V32C320 14.326 305.674 0 288 ' +
            '0ZM288 96H224V32H288V96ZM480 0H416C398.326 0 384 14.326 384 32V96C384 113.674 ' +
            '398.326 128 416 128H480C497.674 128 512 113.674 512 96V32C512 14.326 497.674 ' +
            '0 480 0ZM480 96H416V32H480V96Z'
          }
        />
      </svg>
    </button>
  );
};

export default MenuButton;
