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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          borderRadius: '.75rem',
          display: 'flex',
          flexDirection: 'column',
          padding: 0
        }),
        multiValue: (provided) => ({
          ...provided,
          color: '#334155',
          backgroundColor: '#E2E8F0',
          borderRadius: '.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 18,
          padding: '0.12rem 0.5rem',
          marginRight: 4
        }),
        multiValueRemove: (provided) => ({
          ...provided,
          backgroundColor: '#94A3B8',
          marginLeft: 2,
          width: 22,
          height: 22,
          color: '#F8FAFC',
          borderRadius: '0.25rem'
        }),
        input: (provided) => ({
          ...provided,
          marginLeft: 1,
          marginBottom: 3
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
          borderColor: '#94A3B8',
          width: '100%'
        }),
        indicatorSeparator: () => ({
          display: 'none'
        }),
        indicatorsContainer: (provided) => ({
          ...provided,
          paddingRight: 0
        }),
        menu: (provided) => ({
          ...provided,
          borderRadius: '.75rem',
          zIndex: 9999
        })
      }}
      className='flex w-full'
      options={data.map((character: Character) => ({
        value: character.id,
        label: character.name,
        img: character.image,
        episodeCount: character.episode.length
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
                'flex w-full flex-1 flex-row items-center text-sm text-gray-500 pt-[5px] pb-[6px]  px-2.5 border-b border-slate-300',
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
              <img src={option.data.img} alt={option.data.label} className='mr-2 h-9 w-9 rounded-s-md' />
              <div className='flex flex-col items-start justify-between pl-[2px]'>
                <p
                  className='pt-[1.5px] font-medium capitalize leading-6 '
                  dangerouslySetInnerHTML={{
                    __html: handleLabelWithSearchValue(option.data.label)
                  }}
                />
                <p>{`${option.data.episodeCount} Episodes`}</p>
              </div>
            </button>
          );
        }
      }}
      isLoading={isLoading}
      isMulti
      isClearable={false}
      isSearchable
    />
  );
};

const MemoizedCustomSelect = memo(CustomSelect);
export default MemoizedCustomSelect;
