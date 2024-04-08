// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "./InsuranceLiquidityPool.sol";
import "./Factory.sol";

contract DataInsurance {
    address public owner;
    enum InsuranceType { DataCoverage, TransactionProtection }
    struct Policy {
        InsuranceType insuranceType;
        uint256 coverageAmount;
        uint256 premium;
        bool active;
    }
    mapping(address => Policy) public policies;

    // Events
    event CoverPolicyApplied(address insured, InsuranceType insuranceType, uint256 premium);
    event PremiumPaid(address insured, uint256 amount);
    event InsuranceClaimed(address insured, uint256 claimAmount);

    InsuranceLiquidityPool private liquidityPool;

    address public factoryContract;

    constructor(address _liquidityPoolAddress, address _owner, address _factoryContract) {
        owner = _owner;
        liquidityPool = InsuranceLiquidityPool(_liquidityPoolAddress);
        factoryContract = _factoryContract;
    }

    modifier onlyInsuredOwner() {
        require(isOwnerInsuredByFactory(), "Owner is not insured by the factory");
        _;
    }

    function isOwnerInsuredByFactory() private view returns (bool) {
    InsuranceFactory factory = InsuranceFactory(factoryContract);
    uint length = factory.dataInsurancesLength();

    for (uint i = 0; i < length; i++) {
        address insuranceAddress = factory.dataInsurances(i); 
        if (insuranceAddress == owner) {
            return true;
        }
    }
    return false;
}


    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

       function applyForInsurance(InsuranceType _insuranceType, uint256 _coverageAmount, uint256 _premium) public payable onlyInsuredOwner {
        require(!policies[msg.sender].active, "Already insured");

        
        require(msg.value == _premium, "Incorrect premium amount");

        
        uint256 expectedPremium = calculatePremium(_insuranceType, _coverageAmount);
        require(_premium == expectedPremium, "Premium does not match expected amount");

       
        liquidityPool.depositTo{value: msg.value}(msg.sender);

        // Create and store the new policy
        policies[msg.sender] = Policy(_insuranceType, _coverageAmount, _premium, true);

        // Emit an event to indicate that a policy has been applied for and the premium paid
        emit CoverPolicyApplied(msg.sender, _insuranceType, _premium);
    }


    function claimInsurance() public onlyInsuredOwner {
        require(policies[msg.sender].active, "No active policy");
        uint256 payout = calculatePayout(msg.sender);

        liquidityPool.withdraw(payout, msg.sender, payable(msg.sender)); // Withdraw payout from liquidity pool
        emit InsuranceClaimed(msg.sender, payout);

        policies[msg.sender].active = false;
    }

    

    function calculatePremium(InsuranceType _insuranceType, uint256 _coverageAmount) private pure returns (uint256) {
        if (_insuranceType == InsuranceType.DataCoverage) {
            return _coverageAmount * 2 / 100; // 2% for Data Coverage
        } else if (_insuranceType == InsuranceType.TransactionProtection) {
            return _coverageAmount * 3 / 100; // 3% for Transaction Protection
        } else {
            revert("Invalid insurance type");
        }
    }

    function calculatePayout(address _policyHolder) private view returns (uint256) {
        Policy memory policy = policies[_policyHolder];
    
        if (policy.insuranceType == InsuranceType.DataCoverage) {
          
            return policy.coverageAmount * 75 / 100;
        } else if (policy.insuranceType == InsuranceType.TransactionProtection) {
            
            return policy.coverageAmount * 85 / 100;
        } else {
            // Handle unexpected insurance type
            revert("Invalid insurance type");
        }
    }
    
}
