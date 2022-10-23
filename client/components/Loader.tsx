import Image from 'next/image';
import loader from '../public/icons/loader.svg'

interface LoaderProps {
      fixed?: boolean
}

export const Loader = ({ fixed }: LoaderProps) => {
  return (
            <div className={fixed ? 'fixed left-4 bottom-4' : ''}>
                  <Image src={loader} width={50} height={50} alt="loader" />
            </div>
      );
}