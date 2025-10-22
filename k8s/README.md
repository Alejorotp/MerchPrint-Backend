# Kubernetes Manifests for MerchPrint

This folder contains Kubernetes manifests to deploy the stack in the `merchprint` namespace:

Components:

- RabbitMQ (Deployment + Service + Secret for RMQ_URL)
- API Gateway (Deployment + NodePort Service)
- Auth, Companies, Events, Orders services (Deployment + ClusterIP Service each)
- MongoDB for each service (Deployment + ClusterIP Service each)
- Per-service Secrets with DB_URI (and JWT_SECRET for auth)

Notes:

- Update the `image:` fields for the Deployments to point to your container registry (e.g., `ghcr.io/<org>/api-gateway:TAG`). The current values are placeholders: `merchprint/<service>:latest`.
- RMQ credentials in Kubernetes are `rmq/rmqpass`. The `rmq-secret` holds the full `RMQ_URL` (amqp://rmq:rmqpass@rabbitmq:5672).
- Databases use `emptyDir:` volumes for simplicity (no persistence). Replace with `PersistentVolumeClaim` resources for production.
- API Gateway Service is `NodePort` to simplify local access. You may switch to `ClusterIP` and use an Ingress instead.

Apply order (optional):

1. Namespace
2. RabbitMQ (secret -> deployment -> service)
3. Databases
4. Service secrets
5. Services (deployments -> services)

Troubleshooting:

- Ensure images are available to your cluster nodes (push to a registry or use a local registry).
- Check pod logs for connection issues to RabbitMQ (`RMQ_URL`) or Mongo (`DB_URI`).
- If using a cloud k8s, replace NodePort with an Ingress + LoadBalancer according to your provider.
