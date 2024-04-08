// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
import "./Data.sol";
import "./SP.sol";

contract InsuranceFactory {
    address[]  public dataInsurances;
    address[] public spInsurances;

     function createDataInsurance(address _liquidityPoolAddress, address _owner, address _factoryContract) public {
        // Create a new DataInsurance instance with the specified owner
        DataInsurance newDataInsurance = new DataInsurance(_liquidityPoolAddress, _owner, _factoryContract);
        dataInsurances.push(address(newDataInsurance));
    }

    function createSPInsurance(address _liquidityPoolAddress, address _owner, address _factoryContract) public {
        ServiceProviderInsurance newSpInsurance = new ServiceProviderInsurance(_liquidityPoolAddress, _owner, _factoryContract);
        spInsurances.push(address(newSpInsurance));
    }

   function dataInsurancesLength() public view returns (uint) {
        return dataInsurances.length;
    }
    function spInsurancesLength() public view returns (uint) {
        return spInsurances.length;
    }
}
