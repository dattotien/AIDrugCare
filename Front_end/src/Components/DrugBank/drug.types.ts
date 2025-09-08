export interface BrandName {
  name: string;
  route?: string;
  strength?: string;
  dosage_form?: string;
  country?: string;
}

export interface DrugInteraction {
  drugbank_id: string;
  name: string;
  description: string;
}

export interface Drug {
  _id: string;
  generic_name: string;
  description?: string;
  brand_names?: BrandName[];
  manufacturers?: string[];
  dosage_forms?: string[];
  categories?: string[];
  atc_code?: string[];
  chemical_formula?: string;
  molecular_formula?: string;
  drug_interaction?: DrugInteraction[];
  synonyms?: string[];
}
