# DNS Proxy with IPv6 Filtering

This project provides a Docker image for a DNS proxy server that forwards all types of DNS queries to a specified DNS server, and removes all IPv6 addresses matching a specified CIDR range in AAAA responses for a specified domain name and its subdomains.

## Prerequisites

- Docker

## Usage

To run this Docker image, use the following command:

```
docker run -e DNS=8.8.8.8 -e CIDR='240e:3a0::/28' -e DOMAIN='.example.com' -e PORT=53 -p 53:53 dns-proxy
```


The following environment variables can be set:

- `DNS`: the IP address of the forward DNS server (default: `8.8.8.8`)
- `CIDR`: the CIDR range to remove from the AAAA responses (default: `240e:3a0::/28`)
- `DOMAIN`: the domain name and its subdomains to filter (default: `.example.com`)
- `PORT`: the port to listen on (default: `53`)

## Building the Docker Image

To build the Docker image, follow these steps:

1. Clone this repository.
2. Navigate to the repository directory.
3. Run the following command:

```
docker build -t dns-proxy .
```

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.
