import { useState } from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  Edit2,
  Trash2,
  Filter,
  Calendar,
  Receipt,
  TrendingUp,
  DollarSign,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageTransition } from "@/components/layout/PageTransition";

interface Expense {
  id: string;
  date: Date;
  amount: number;
  category: string;
  paymentMethod: string;
  description: string;
}

const mockExpenses: Expense[] = [
  {
    id: "1",
    date: new Date(2024, 0, 15),
    amount: 250,
    category: "Transportation",
    paymentMethod: "Credit Card",
    description: "Gas for car",
  },
  {
    id: "2",
    date: new Date(2024, 0, 14),
    amount: 850,
    category: "Food & Dining",
    paymentMethod: "Debit Card",
    description: "Weekly groceries",
  },
  {
    id: "3",
    date: new Date(2024, 0, 13),
    amount: 450,
    category: "Entertainment",
    paymentMethod: "Cash",
    description: "Concert tickets",
  },
  {
    id: "4",
    date: new Date(2024, 0, 12),
    amount: 1200,
    category: "Shopping",
    paymentMethod: "Credit Card",
    description: "New headphones",
  },
  {
    id: "5",
    date: new Date(2024, 0, 11),
    amount: 180,
    category: "Utilities",
    paymentMethod: "Bank Transfer",
    description: "Internet bill",
  },
  {
    id: "6",
    date: new Date(2024, 0, 10),
    amount: 350,
    category: "Food & Dining",
    paymentMethod: "Credit Card",
    description: "Restaurant dinner",
  },
];

const categoryData = [
  { name: "Food & Dining", value: 1200, color: "hsl(160, 84%, 39%)" },
  { name: "Transportation", value: 850, color: "hsl(35, 100%, 55%)" },
  { name: "Entertainment", value: 450, color: "hsl(210, 100%, 50%)" },
  { name: "Shopping", value: 1200, color: "hsl(280, 70%, 50%)" },
  { name: "Utilities", value: 180, color: "hsl(340, 70%, 50%)" },
];

const timeSeriesData = [
  { date: "Jan 1", amount: 450 },
  { date: "Jan 5", amount: 820 },
  { date: "Jan 10", amount: 530 },
  { date: "Jan 15", amount: 1100 },
  { date: "Jan 20", amount: 680 },
  { date: "Jan 25", amount: 920 },
  { date: "Jan 30", amount: 750 },
];

const categories = [
  "All Categories",
  "Food & Dining",
  "Transportation",
  "Entertainment",
  "Shopping",
  "Utilities",
];

export default function Expenses() {
  const [expenses] = useState<Expense[]>(mockExpenses);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const filteredExpenses = expenses.filter((expense) => {
    if (selectedCategory !== "All Categories" && expense.category !== selectedCategory) {
      return false;
    }
    return true;
  });

  const totalExpenses = filteredExpenses.reduce((sum, exp) => sum + exp.amount, 0);

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      "Food & Dining": "bg-primary",
      Transportation: "bg-accent",
      Entertainment: "bg-info",
      Shopping: "bg-purple-500",
      Utilities: "bg-pink-500",
    };
    return colors[category] || "bg-muted";
  };

  return (
    <PageTransition>
      <div className="p-8">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-2xl font-semibold text-foreground">Expenses</h1>
            <p className="mt-1 text-muted-foreground">
              Track and analyze your spending patterns
            </p>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8 grid gap-4 sm:grid-cols-3"
          >
            <Card className="shadow-fintech-card">
              <CardContent className="flex items-center gap-4 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <DollarSign className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Expenses</p>
                  <p className="text-2xl font-semibold text-foreground">
                    ${totalExpenses.toLocaleString()}
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card className="shadow-fintech-card">
              <CardContent className="flex items-center gap-4 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
                  <Receipt className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Transactions</p>
                  <p className="text-2xl font-semibold text-foreground">
                    {filteredExpenses.length}
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card className="shadow-fintech-card">
              <CardContent className="flex items-center gap-4 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-info/10">
                  <TrendingUp className="h-6 w-6 text-info" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Avg. per Transaction</p>
                  <p className="text-2xl font-semibold text-foreground">
                    ${filteredExpenses.length > 0 
                      ? Math.round(totalExpenses / filteredExpenses.length).toLocaleString()
                      : 0}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Charts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8 grid gap-6 lg:grid-cols-2"
          >
            {/* Category Chart */}
            <Card className="shadow-fintech-card">
              <CardHeader>
                <CardTitle className="text-lg">Expenses by Category</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={4}
                        dataKey="value"
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value: number) => [`$${value}`, "Amount"]}
                        contentStyle={{
                          borderRadius: "8px",
                          border: "1px solid hsl(var(--border))",
                          backgroundColor: "hsl(var(--card))",
                        }}
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Time Series Chart */}
            <Card className="shadow-fintech-card">
              <CardHeader>
                <CardTitle className="text-lg">Expenses Over Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={timeSeriesData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis
                        dataKey="date"
                        tick={{ fontSize: 12 }}
                        stroke="hsl(var(--muted-foreground))"
                      />
                      <YAxis
                        tick={{ fontSize: 12 }}
                        stroke="hsl(var(--muted-foreground))"
                        tickFormatter={(value) => `$${value}`}
                      />
                      <Tooltip
                        formatter={(value: number) => [`$${value}`, "Amount"]}
                        contentStyle={{
                          borderRadius: "8px",
                          border: "1px solid hsl(var(--border))",
                          backgroundColor: "hsl(var(--card))",
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="amount"
                        stroke="hsl(160, 84%, 39%)"
                        strokeWidth={2}
                        dot={{ fill: "hsl(160, 84%, 39%)", strokeWidth: 2 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="mb-6 shadow-fintech-card">
              <CardContent className="flex flex-wrap items-center gap-4 p-4">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium text-foreground">Filters:</span>
                </div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <Input
                    type="date"
                    value={dateFrom}
                    onChange={(e) => setDateFrom(e.target.value)}
                    className="w-40"
                    placeholder="From"
                  />
                  <span className="text-muted-foreground">to</span>
                  <Input
                    type="date"
                    value={dateTo}
                    onChange={(e) => setDateTo(e.target.value)}
                    className="w-40"
                    placeholder="To"
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="shadow-fintech-card">
              <CardHeader>
                <CardTitle className="text-lg">Recent Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                {filteredExpenses.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Payment Method</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                        <TableHead className="w-24">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredExpenses.map((expense) => (
                        <TableRow key={expense.id}>
                          <TableCell className="text-muted-foreground">
                            {format(expense.date, "MMM d, yyyy")}
                          </TableCell>
                          <TableCell className="font-medium">
                            {expense.description}
                          </TableCell>
                          <TableCell>
                            <span
                              className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${getCategoryColor(
                                expense.category
                              )} bg-opacity-10 text-foreground`}
                            >
                              <span
                                className={`h-1.5 w-1.5 rounded-full ${getCategoryColor(
                                  expense.category
                                )}`}
                              />
                              {expense.category}
                            </span>
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {expense.paymentMethod}
                          </TableCell>
                          <TableCell className="text-right font-semibold">
                            ${expense.amount.toLocaleString()}
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-muted-foreground hover:text-foreground"
                              >
                                <Edit2 className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-muted-foreground hover:text-destructive"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12">
                    <Receipt className="mb-4 h-12 w-12 text-muted-foreground/50" />
                    <h3 className="mb-1 text-lg font-medium text-foreground">
                      No expenses yet
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Start tracking your spending by chatting with your assistant
                    </p>
                    <Button className="mt-4" variant="outline">
                      Go to Chat
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}
