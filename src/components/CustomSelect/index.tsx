import React, { useCallback, memo } from 'react';

import cn from 'classnames';
import Select from 'react-select';
import { type Character } from 'rickmortyapi';

interface Props {
  search: string;
  data: Character[];
  isLoading: boolean;
  setSearch: (value: string) => void;
}
const CustomSelect: React.FC<Props> = ({ search, data, isLoading, setSearch }) => {
  const resetSearchValue = React.useCallback(() => {
    setTimeout(() => {
      setSearch('');
    }, 500);
  }, []);

  const handleLabelWithSearchValue = useCallback(
    (label: string) => {
      return label.toLocaleLowerCase().replace(search.toLocaleLowerCase(), `<strong>${search}</strong>`);
    },
    [search]
  );

  return (
    <Select
      styles={{
        menuList: (provided) => ({
          ...provided,
          borderWidth: 1,
          borderColor: '#94A3B8',
          borderRadius: '1rem'
        }),
        multiValue: (provided) => ({
          ...provided,
          color: '#334155',
          backgroundColor: '#E2E8F0',
          borderRadius: '1rem',
          padding: '0.1rem 0.325rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }),
        multiValueRemove: (provided) => ({
          ...provided,
          backgroundColor: '#94A3B8',
          margin: 4,
          aspectRatio: 1,
          color: '#F8FAFC',
          borderRadius: '0.375rem'
        }),
        input: (provided) => ({
          ...provided,
          height: '2.125rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }),
        container: (provided) => ({
          ...provided,
          width: '100%'
        }),
        valueContainer: (provided) => ({
          ...provided,
          padding: '0.215rem'
        }),
        control: (provided) => ({
          ...provided,
          borderRadius: '1rem',
          borderWidth: 1,
          height: '2.75rem',
          borderColor: '#94A3B8',
          width: '100%'
        }),
        indicatorSeparator: () => ({
          display: 'none'
        })
      }}
      className='w-full'
      options={data.map((character: Character) => ({
        value: character.id,
        label: character.name,
        img: character.image
      }))}
      hideSelectedOptions={false}
      onInputChange={(value) => {
        setSearch(value);
      }}
      components={{
        Option: (option) => {
          return (
            <button
              className={cn(
                'flex w-full flex-1 flex-row items-center text-sm text-gray-500 p-2 border-b border-slate-300',
                option.isFocused && 'bg-slate-100'
              )}
              key={option.data.value}
              role='option'
              aria-selected={option.isSelected}
              onClick={() => {
                option.selectOption(option.data);
                resetSearchValue();
              }}>
              <input type='checkbox' className='mr-2' checked={option.isSelected} readOnly />
              <img src={option.data.img} alt={option.data.label} className='mr-2 h-8 w-8 rounded-lg' />
              <p
                className='capitalize'
                dangerouslySetInnerHTML={{
                  __html: handleLabelWithSearchValue(option.data.label)
                }}
              />
            </button>
          );
        }
      }}
      menuIsOpen={process.env.NODE_ENV === 'development' ? true : undefined}
      isLoading={isLoading}
      isMulti
      isClearable={false}
      isSearchable
    />
  );
};

const MemoizedCustomSelect = memo(CustomSelect);
export default MemoizedCustomSelect;
