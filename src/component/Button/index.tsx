import styled, { CSSProperties } from 'styled-components';
import color from '../../style/color';

interface HoverProps {
  hoverBackground?: string
  hoverColor?: string
}

const Button = styled.a<CSSProperties & HoverProps>`
  width: ${props => props.width || '120px'};
  height: ${props => props.height || '50px'};
  padding: ${props => props.padding || '20px'};

  filter: ${props => props.filter || 'drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.12))'};
  margin: ${props => props.margin || '0'};
  transition: ${props => props.transition || '0s'};

  border: ${props => props.border || 'none'};
  border-radius: ${props => props.borderRadius || '10px'};
  outline: none;
  cursor: pointer;

  background: ${props => props.background || 'none'};
  background-repeat: ${props => props.backgroundRepeat || 'no-repeat'};
  background-position: ${props => props.backgroundPosition || 'center'};
  /* background-image: ${props => props.backgroundImage || 'url("img.svg")'}; */
  background-color: ${props => props.backgroundColor || color.button};

  color: ${props => props.color || '#fff'};
  font-size: ${props => props.fontSize || '15px'};
  font-weight: ${props => props.fontWeight || '600'};
  letter-spacing: ${props => props.letterSpacing || '1.2px'};

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background: ${props => props.hoverBackground || color.button_hover};
    color: ${props => props.hoverColor || '#fff'};
  }
`;

export default Button;