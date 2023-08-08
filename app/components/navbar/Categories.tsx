'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { TbBeach, TbMountain, TbPool } from 'react-icons/tb';
import { 
  GiBarn, 
  GiBoatFishing, 
  GiCactus, 
  GiCastle, 
  GiCaveEntrance, 
  GiForestCamp, 
  GiIsland,
  GiWindmill
} from 'react-icons/gi';
import { FaSkiing } from 'react-icons/fa';
import { BsSnow } from 'react-icons/bs';
import { IoDiamond } from 'react-icons/io5';
import { MdOutlineVilla } from 'react-icons/md';

import CategoryBox from "../CategoryBox";
import Container from '../Container';


export const categories = [
  {
    label: 'Bãi biển ',
    icon: TbBeach,
    description: 'Chỗ này gần với bãi biển!',
  },
  {
    label: 'Villa',
    icon: MdOutlineVilla,
    description: 'Chỗ này là một căn villa!'
  },
  {
    label: 'Nông thôn',
    icon: TbMountain,
    description: 'Chỗ này ở nông thôn yên tĩnh!'
  },
  {
    label: 'Hồ bơi',
    icon: TbPool,
    description: 'Chỗ này có hồ bơi rất đẹp!'
  },
  /* {
    label: 'Islands',
    icon: GiIsland,
    description: 'This property is on an island!'
  }, */
  {
    label: 'Ven hồ',
    icon: GiBoatFishing,
    description: 'Nơi này gần một cái hồ!'
  },
  /*  {
    label: 'Skiing',
    icon: FaSkiing,
    description: 'This property has skiing activies!'
  },
  {
    label: 'Castles',
    icon: GiCastle,
    description: 'This property is an ancient castle!'
  }, */
  /* {
    label: 'Caves',
    icon: GiCaveEntrance,
    description: 'This property is in a spooky cave!'
  }, */
  
  {
    label: 'Khu cắm trại',
    icon: GiForestCamp,
    description: 'Nơi này phù hợp với những hoạt động cắm trại!'
  },
  /* {
    label: 'Arctic',
    icon: BsSnow,
    description: 'This property is in arctic environment!'
  },
  {
    label: 'Desert',
    icon: GiCactus,
    description: 'This property is in the desert!'
  },
  {
    label: 'Barns',
    icon: GiBarn,
    description: 'This property is in a barn!'
  },
  {
    label: 'Lux',
    icon: IoDiamond,
    description: 'This property is brand new and luxurious!'
  } */
  
]

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get('category');
  const pathname = usePathname();
  const isMainPage = pathname === '/';

  if (!isMainPage) {
    return null;
  }

  return (
    <Container>
      <div
        className="
          pt-4
          flex 
          flex-row 
          items-center 
          justify-between
          overflow-x-auto
        "
      >
        {categories.map((item) => (
          <CategoryBox 
            key={item.label}
            label={item.label}
            icon={item.icon}
            selected={category === item.label}
          />
        ))}
      </div>
    </Container>
  );
}
 
export default Categories;