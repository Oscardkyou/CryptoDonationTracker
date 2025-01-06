// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CharityCampaign {
    struct Campaign {
        uint256 campaignId;
        string description;
        uint256 goalAmount;
        uint256 totalDonated;
        address payable receiver;
        bool isActive;
        uint256 createdAt;
    }

    uint256 private campaignCounter;
    mapping(uint256 => Campaign) public campaigns;
    
    event CampaignCreated(
        uint256 indexed campaignId,
        string description,
        uint256 goalAmount,
        address receiver
    );
    
    event DonationMade(
        uint256 indexed campaignId,
        address indexed donor,
        uint256 amount,
        uint256 timestamp
    );

    event CampaignGoalReached(uint256 indexed campaignId);

    function createCampaign(
        string memory _description,
        uint256 _goalAmount,
        address payable _receiver
    ) public returns (uint256) {
        require(_goalAmount > 0, "Goal amount must be greater than 0");
        require(_receiver != address(0), "Invalid receiver address");

        campaignCounter++;
        
        campaigns[campaignCounter] = Campaign({
            campaignId: campaignCounter,
            description: _description,
            goalAmount: _goalAmount,
            totalDonated: 0,
            receiver: _receiver,
            isActive: true,
            createdAt: block.timestamp
        });

        emit CampaignCreated(
            campaignCounter,
            _description,
            _goalAmount,
            _receiver
        );

        return campaignCounter;
    }

    function donate(uint256 _campaignId) public payable {
        Campaign storage campaign = campaigns[_campaignId];
        require(campaign.isActive, "Campaign is not active");
        require(msg.value > 0, "Donation amount must be greater than 0");

        campaign.totalDonated += msg.value;
        
        // Transfer the donation to the campaign receiver
        campaign.receiver.transfer(msg.value);

        emit DonationMade(
            _campaignId,
            msg.sender,
            msg.value,
            block.timestamp
        );

        if (campaign.totalDonated >= campaign.goalAmount) {
            campaign.isActive = false;
            emit CampaignGoalReached(_campaignId);
        }
    }

    function getCampaignDetails(uint256 _campaignId)
        public
        view
        returns (
            string memory description,
            uint256 goalAmount,
            uint256 totalDonated,
            address receiver,
            bool isActive,
            uint256 createdAt
        )
    {
        Campaign storage campaign = campaigns[_campaignId];
        return (
            campaign.description,
            campaign.goalAmount,
            campaign.totalDonated,
            campaign.receiver,
            campaign.isActive,
            campaign.createdAt
        );
    }
}
