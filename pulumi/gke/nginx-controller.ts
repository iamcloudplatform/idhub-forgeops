import * as k8s from "@pulumi/kubernetes";
import { clusterProvider } from "./cluster";
import * as gcp from "@pulumi/gcp";
import * as pulumi from "@pulumi/pulumi";
import { ip, nginxVersion } from "./config";
import { primaryPool } from "./cluster";
import * as ingressController from "../packages/nginx-ingress-controller";

// Check to see if static IP address has been provided. If not, create 1
function assignIp() {
    if (ip !== undefined) {
        let a: pulumi.Output<string> = pulumi.concat(ip);
        return (a);
    } else {
        const staticIp = new gcp.compute.Address("cdm-ingress-ip", {
            addressType: "EXTERNAL",
        });
        return staticIp.address;
    }
}

// Get static IP
export const lbIp = assignIp();

// Set values for nginx Helm chart
const nginxValues: ingressController.ChartArgs = {
    ip: lbIp,
    version: nginxVersion,
    clusterProvider: clusterProvider,
    dependency: primaryPool
}

// Deploy Nginx Ingress Controller Helm chart
export const nginxControllerChart = new ingressController.NginxIngressController( nginxValues );
