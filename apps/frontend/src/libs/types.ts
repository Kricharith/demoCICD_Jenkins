export interface BarCode {
  type: string;
  value: string;
  rectLeft: number;
  rectTop: number;
  rectWidth: number;
  rectHeight: number;
}

export interface AttachedFile {
  name: string;
  contentType: string;
  data: string;
}


export interface InvoiceItem {
  itemName: string;
  quantity: number;
  itemUnit: string;
  itemPrice: number
}

export interface InvoiceDocument {
  id: number;
  entrepreneur: string;
  address: string | null;
  invoiceNumber: string;
  day: number;
  month: number;
  year: number;
  itemPriceCurrency: string;
  tax: string;
  table: InvoiceItem[] | null;
  file: AttachedFile[] | null;
  createdAt: string | null;
  updatedAt: string | null;
  barcodes: BarCode[] | null;
  invoiceDate: string | null;
}

export interface InvoiceDocumentTableRow extends Omit<InvoiceDocument, 'table'> {
  createdAt: string;
  updatedAt: string;
}

export interface Paginated<T> {
  items: T[];
  total: number;
}


/**
 * registration_date: Optional[str] = Field(None, description="The registration date", alias="registrationDate")
    license_plate: Optional[str] = Field(None, description="The license plate", alias="licensePlate")
    province: Optional[str] = Field(None, description="The province", alias="province")

    vehicle_type: Optional[str] = Field(None, description="The vehicle type", alias="vehicleType")

    brand: Optional[str] = Field(None, description="The brand", alias="brand")
    model: Optional[str] = Field(None, description="The model", alias="model")
    color: Optional[str] = Field(None, description="The color", alias="color")
    chassis_number: Optional[str] = Field(None, description="The chassis number", alias="chassisNumber")
    engine_number: Optional[str] = Field(None, description="The engine number", alias="engineNumber")
    engine_type: Optional[str] = Field(None, description="The engine type", alias="engineType")
    fuel: Optional[str] = Field(None, description="The fuel", alias="fuel")
    cylinders: Optional[int] = Field(None, description="The cylinders number", alias="cylinders")
    cylinder_capacity: Optional[str] = Field(None, description="The cylinder capacity", alias="cylinderCapacity")
    vehicle_weight: Optional[str] = Field(None, description="The vehicle weight", alias="vehicleWeight")
    net_weight: Optional[str] = Field(None, description="The net weight", alias="netWeight")
    seats: Optional[str] = Field(None, description="The seats", alias="seats")


    owner_number: Optional[int] = Field(None, description="The owner number", alias="ownerNumber")
    acquisition_date: Optional[str] = Field(None, description="The acquisition date", alias="acquisitionDate")

    owner_name: Optional[str] = Field(None, description="The owner name", alias="ownerName")
    owner_card_id: Optional[str] = Field(None, description="The owner card id", alias="ownerCardId")
    owner_birth_date: Optional[str] = Field(None, description="The owner birth date", alias="ownerBirthDate")
    owner_nationality: Optional[str] = Field(None, description="The owner nationality", alias="ownerNationality")
    owner_address: Optional[str] = Field(None, description="The owner address", alias="ownerAddress")

    possessor_name: Optional[str] = Field(None, description="The possessor name", alias="possessorName")
    possessor_card_id: Optional[str] = Field(None, description="The possessor card id", alias="possessorCardId")
    possessor_birth_date: Optional[str] = Field(None, description="The possessor birth date", alias="possessorBirthDate")
    possessor_nationality: Optional[str] = Field(None, description="The possessor nationality", alias="possessorNationality")
    possessor_address: Optional[str] = Field(None, description="The possessor address", alias="possessorAddress")
 */

export interface VehicleRegistrationBase {
  registrationDate?: string;
  licensePlate?: string;
  province?: string;

  vehicleType?: string;

  brand?: string;
  model?: string;
  color?: string;
  chassisNumber?: string;
  engineNumber?: string;
  engineType?: string;
  fuel?: string;
  cylinders?: string;
  cylinderCapacity?: string;
  vehicleWeight?: string;
  netWeight?: string;
  seats?: string;

  ownerNumber?: number;
  acquisitionDate?: string;

  ownerName?: string;
  ownerCardId?: string;
  ownerBirthDate?: string;
  ownerNationality?: string;
  ownerAddress?: string;

  possessorName?: string;
  possessorCardId?: string;
  possessorBirthDate?: string;
  possessorNationality?: string;
  possessorAddress?: string;
}

export interface VehicleRegistrationWithBarcodes extends VehicleRegistrationBase {
  id: number;
  barcodes: BarCode[] | null;
}
