import React, { useState, useEffect, useRef } from 'react';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import Styles from "./dropdown-simple.module.scss"
import { Category } from '@/contexts/categories/types';

interface DropdownProps {
  children: React.ReactNode;
  categories: Category[];
  contentWidth: string;
  onCategorySelect: (category: Category) => void;
}

const DropdownSimple: React.FC<DropdownProps> = ({ children, categories, contentWidth, onCategorySelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleCategoryClick = (category: Category) => {
    setSelectedCategory(category);
    onCategorySelect(category);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <div className={`${Styles.dropdown_simple} ${isOpen ? Styles.open : ''}`} ref={dropdownRef}>
      <div className={Styles.dropdown_header} onClick={toggleDropdown}>
        {children}
        {isOpen ? <FaAngleUp className={Styles.dropdown_icon} /> : <FaAngleDown className={Styles.dropdown_icon} />}
      </div>
      {isOpen && (
        <div className={Styles.dropdown_content} style={{ width: contentWidth }}>
          {categories.map((category) => (
            <div 
              className={Styles.category_item} 
              key={category.id} 
              onClick={() => handleCategoryClick(category)}
            >
              <span>{category.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownSimple;
