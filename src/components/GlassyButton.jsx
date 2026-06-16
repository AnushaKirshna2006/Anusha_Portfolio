import React from 'react';
import { motion } from 'framer-motion';
import { useSound } from './SoundContext';
import './GlassyButton.css';

const transition = { bounce: 0.1, delay: 0, duration: 0.4, type: "spring" };

export const GlassyButton = ({
  children,
  icon: Icon,
  onClick,
  disabled = false,
  className = '',
  style = {},
  ...props
}) => {
  const { playGlassTap } = useSound();

  const handleClick = (e) => {
    if (!disabled) {
      if (playGlassTap) playGlassTap();
      if (onClick) onClick(e);
    }
  };

  return (
    <motion.button
      className={`glassy-btn-wrapper ${disabled ? 'disabled' : ''} ${className}`}
      onClick={handleClick}
      initial="idle"
      whileHover={!disabled ? "hover" : "idle"}
      whileTap={!disabled ? "pressed" : "idle"}
      variants={{
        idle: {
          background: "linear-gradient(180deg, rgb(255, 255, 255) 0%, rgb(201, 201, 201) 8.99%, rgb(161, 161, 161) 31.88%, rgb(117, 117, 117) 73%, rgb(255, 255, 255) 100%)",
          boxShadow: "0.067px 1.008px 0.505px 0px rgba(0, 0, 0, 0), 0.159px 2.389px 1.197px 0px rgba(0, 0, 0, 0), 0.29px 4.357px 2.183px 0px rgba(0, 0, 0, 0.01), 0.483px 7.244px 3.63px 0px rgba(0, 0, 0, 0.01), 0.78px 11.698px 5.862px 0px rgba(0, 0, 0, 0.02), 1.277px 19.148px 9.595px 0px rgba(0, 0, 0, 0.03), 2.198px 32.971px 16.522px 0px rgba(0, 0, 0, 0.05), 4px 60px 30.067px 0px rgba(0, 0, 0, 0.1)"
        },
        hover: {
          background: "linear-gradient(180deg, rgb(255, 255, 255) 0%, rgb(201, 201, 201) 8.99%, rgb(161, 161, 161) 31.88%, rgb(117, 117, 117) 73%, rgb(255, 255, 255) 100%)",
          boxShadow: "0.067px 1.008px 0.505px 0px rgba(0, 0, 0, 0), 0.159px 2.389px 1.197px 0px rgba(0, 0, 0, 0), 0.29px 4.357px 2.183px 0px rgba(0, 0, 0, 0.01), 0.483px 7.244px 3.63px 0px rgba(0, 0, 0, 0.01), 0.78px 11.698px 5.862px 0px rgba(0, 0, 0, 0.01), 1.277px 19.148px 9.595px 0px rgba(0, 0, 0, 0.02), 2.198px 32.971px 16.522px 0px rgba(0, 0, 0, 0.04), 4px 60px 30.067px 0px rgba(0, 0, 0, 0.07)"
        },
        pressed: {
          background: "linear-gradient(180deg, rgb(255, 255, 255) 0%, rgb(201, 201, 201) 8.99%, rgb(161, 161, 161) 31.88%, rgb(117, 117, 117) 73%, rgb(255, 255, 255) 100%)",
          boxShadow: "0.067px 1.008px 0.404px -0.375px rgba(0, 0, 0, 0.03), 0.159px 2.389px 0.958px -0.75px rgba(0, 0, 0, 0.03), 0.29px 4.357px 1.747px -1.125px rgba(0, 0, 0, 0.03), 0.483px 7.244px 2.904px -1.5px rgba(0, 0, 0, 0.03), 0.78px 11.698px 4.689px -1.875px rgba(0, 0, 0, 0.03), 1.277px 19.148px 7.676px -2.25px rgba(0, 0, 0, 0.03), 2.198px 32.971px 13.218px -2.625px rgba(0, 0, 0, 0.02), 4px 60px 24.053px -3px rgba(0, 0, 0, 0.02)"
        }
      }}
      transition={transition}
      disabled={disabled}
      style={style}
      {...props}
    >
      <motion.div 
        className="glassy-btn-content"
        variants={{
          idle: {
            background: "linear-gradient(150deg, rgb(208, 208, 208) 0%, rgb(204, 204, 204) 50.17%, rgb(200, 200, 200) 100%)",
            boxShadow: "inset 2px 4px 5px 0px rgba(0, 0, 0, 0), inset 0px 0px 1px 1px rgba(0, 0, 0, 0)"
          },
          hover: {
            background: "linear-gradient(150deg, rgb(208, 208, 208) 0%, rgb(232, 232, 232) 50.17%, rgb(200, 200, 200) 100%)",
            boxShadow: "inset 2px 4px 5px 0px rgba(0, 0, 0, 0), inset 0px 0px 1px 1px rgba(0, 0, 0, 0)"
          },
          pressed: {
            background: "linear-gradient(150deg, rgb(208, 208, 208) 0%, rgb(232, 232, 232) 50.17%, rgb(200, 200, 200) 100%)",
            boxShadow: "inset 2px 4px 5px 0px rgba(0, 0, 0, 0), inset 0px 0px 1px 1px rgba(0, 0, 0, 0)"
          }
        }}
        transition={transition}
      >
        <div className="glassy-btn-inner">
          {Icon && (
            <motion.div 
              className="glassy-btn-icon-container"
              variants={{
                idle: { opacity: 1 },
                hover: { opacity: 1 },
                pressed: { opacity: 0.8 }
              }}
              transition={transition}
            >
              {/* Shadow Icon for depth */}
              <div className="glassy-btn-icon-shadow">
                <Icon strokeWidth={1.5} color="rgba(255, 255, 255, 0.8)" />
              </div>
              <div className="glassy-btn-icon-main">
                <Icon strokeWidth={1.5} color="rgb(0, 0, 0)" />
              </div>
            </motion.div>
          )}
          {children && <span className="glassy-btn-text">{children}</span>}
        </div>
      </motion.div>
    </motion.button>
  );
};
