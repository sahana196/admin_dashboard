export class Employee {
    constructor(id, name, email, role, department, status) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.role = role;
        this.department = department;
        this.status = status;
    }
}

export const mockEmployees = [
    new Employee(1, 'John Doe', 'john.doe@example.com', 'Admin', 'IT', 'Active'),
    new Employee(2, 'Jane Smith', 'jane.smith@example.com', 'Manager', 'HR', 'Active'),
    new Employee(3, 'Alice Johnson', 'alice.johnson@example.com', 'Developer', 'Engineering', 'Active'),
    new Employee(4, 'Bob Brown', 'bob.brown@example.com', 'Designer', 'Design', 'Inactive'),
    new Employee(5, 'Charlie Davis', 'charlie.davis@example.com', 'Analyst', 'Finance', 'Active'),
];
