import * as awsx from "@pulumi/awsx";
import * as aws from "@pulumi/aws";
import * as pulumi from "@pulumi/pulumi";

import {
    numOfAzs,
} from "./config"
        
const publicSubnetArgs: awsx.ec2.VpcSubnetArgs = {
    name: 'publicSubnet',
    cidrMask: 20,
    type: 'public',
};

// const publicSubnetArgsB: awsx.ec2.VpcSubnetArgs = {
//     name: 'publicSubnetB',
//     cidrMask: 20,
//     type: 'public',
// };

const privateSubnetArgs: awsx.ec2.VpcSubnetArgs = {
    name: 'privateSubnet',
    cidrMask: 20,
    type: 'private',
};

// const privateSubnetArgsB: awsx.ec2.VpcSubnetArgs = {
//     name: 'privateSubnetB',
//     cidrMask: 20,
//     type: 'private',
// };

/* VPC configuration */
const vpcArguments: awsx.ec2.VpcArgs = {
    cidrBlock: '192.168.0.0/16',
    numberOfAvailabilityZones: numOfAzs,
    enableDnsHostnames: true,
    enableDnsSupport: true,
    tags: { 
        Name: "eks-cdm", 
        CreatedBy: `process.env.USER`
    },
    subnets: [ publicSubnetArgs, privateSubnetArgs  ],
};


// Create VPC
export const vpc = new awsx.ec2.Vpc("eks-cdm", vpcArguments);
