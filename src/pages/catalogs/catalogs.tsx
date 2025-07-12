import React from 'react';
import CategoryList from '~/components/ui/catagory';

export interface CatalogsProps {}


export const Catalogs: React.FC<CatalogsProps> = () => {

	return (
		<div>
            <div className="container mx-auto mt-2">
			<CategoryList/>
    		</div>
		</div>
		
	);
};
