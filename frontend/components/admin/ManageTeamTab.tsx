"use client";

import { useState } from "react";
import { Plus, Trash2, X } from "lucide-react";

interface TeamUser {
    id: number;
    name: string;
    email: string;
    role: "manager" | "sales";
}

interface ManageTeamTabProps {
    team: TeamUser[];
    loading: boolean;
    createUser: (data: { name: string; email: string; role: "manager" | "sales" }) => Promise<void>;
    deleteUser: (id: number) => Promise<void>;
    refresh: () => void;
}

export default function ManageTeamTab({
    team,
    loading,
    createUser,
    deleteUser,
    refresh,
}: ManageTeamTabProps) {

    const [showModal, setShowModal] = useState(false);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState<"manager" | "sales">("manager");

    const openAddModal = () => {
        setName("");
        setEmail("");
        setRole("manager");
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        await createUser({ name, email, role });

        closeModal();
        refresh();
    };

    if (loading) {
        return (
            <div className="py-40 flex justify-center">
                <div className="w-12 h-12 border-4 border-gray-300 border-t-primary rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h2 className="font-serif text-3xl">Manage Team ({team.length})</h2>

                <button
                    onClick={openAddModal}
                    className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-md hover:bg-primary/90"
                >
                    <Plus className="w-5 h-5" />
                    Add Team Member
                </button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {team.map((member) => (
                    <div key={member.id} className="bg-muted/30 p-6 rounded-lg shadow-md">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="font-serif text-xl">{member.name}</h3>
                                <p className="text-sm mt-1 text-muted-foreground">{member.email}</p>
                                <p className="text-sm mt-1 text-muted-foreground">
                                    Role: <b>{member.role.toUpperCase()}</b>
                                </p>
                            </div>

                            <button
                                onClick={() => deleteUser(member.id)}
                                className="p-2 hover:bg-red-500/10 text-red-500 rounded-md"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Add User Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-background rounded-lg max-w-lg w-full shadow-xl">

                        <div className="p-6 border-b flex justify-between items-center sticky top-0 bg-background">
                            <h2 className="font-serif text-2xl">Add Team Member</h2>

                            <button
                                onClick={closeModal}
                                className="p-2 hover:bg-muted rounded-md"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-4">

                            <div>
                                <label className="block text-sm font-medium mb-2">Name</label>
                                <input
                                    type="text"
                                    value={name}
                                    required
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full px-4 py-2 rounded-md border border-border bg-background"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Email</label>
                                <input
                                    type="email"
                                    value={email}
                                    required
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-2 rounded-md border border-border bg-background"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Role</label>
                                <select
                                    value={role}
                                    onChange={(e) => setRole(e.target.value as any)}
                                    className="w-full px-4 py-2 rounded-md border border-border bg-background"
                                >
                                    <option value="manager">Manager</option>
                                    <option value="sales">Sales</option>
                                </select>
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="flex-1 px-6 py-3 border rounded-md hover:bg-muted"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="flex-1 bg-primary text-primary-foreground px-6 py-3 rounded-md hover:bg-primary/90"
                                >
                                    Create User
                                </button>
                            </div>

                        </form>

                    </div>
                </div>
            )}
        </div>
    );
}
