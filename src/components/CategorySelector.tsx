import { getCategories, getWordCountForCategory } from '../utils/wordUtils';
import '../styles/CategorySelector.css';

interface CategorySelectorProps {
    selectedCategory: string;
    onSelect: (category: string) => void;
}

export default function CategorySelector({ selectedCategory, onSelect }: CategorySelectorProps) {
    const categories = getCategories();
    const wordCount = getWordCountForCategory(selectedCategory);

    return (
        <div className="category-selector">
            <select 
                value={selectedCategory}
                onChange={(e) => onSelect(e.target.value)}
                className="category-dropdown"
            >
                {categories.map(category => (
                    <option key={category} value={category}>
                        {category}
                    </option>
                ))}
            </select>
            <span className="word-count">({wordCount} words)</span>
        </div>
    );
}
