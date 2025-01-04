import { Injectable } from '@nestjs/common';
import { AddressDataAccess } from 'src/dataAccess/address.dataAccess';

@Injectable()
export class AddressService {
  constructor(private readonly addressDataAccess: AddressDataAccess) {}
  async create(
    userId: number,
    cityId: number,
    address: string,
    zipCode: number,
  ) {
    return await this.addressDataAccess.createAddress(
      userId,
      cityId,
      address,
      zipCode,
    );
  }

  findAll() {
    return `This action returns all address`;
  }

  findOne(id: number) {
    return `This action returns a #${id} address`;
  }

  // update(id: number, updateAddressDto: UpdateAddressDto) {
  //   return `This action updates a #${id} address`;
  // }

  remove(id: number) {
    return `This action removes a #${id} address`;
  }
}
