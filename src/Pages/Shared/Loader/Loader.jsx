import { ColorRing } from "react-loader-spinner";

const Loader = () => {
   return (
      <div className="flex justify-center align-middle pt-20">
         <ColorRing
            visible={true}
            height="60"
            width="50"
            ariaLabel="color-ring-loading"
            wrapperStyle={{
               display: 'flex',
               alignItems: 'center',
               justifyContent: 'center',
               width: '100%',
            }}
            wrapperClass="color-ring-wrapper"
            colors={['#06b6d4', '#06b6d4', '#06b6d4', '#06b6d4', '#06b6d4']}
         />
      </div>
   );
};

export default Loader;