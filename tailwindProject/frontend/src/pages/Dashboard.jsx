// 'use client'

import { useEffect, useState } from "react";
import { Card, Title, Text, Metric, Grid, BarChart, List, ListItem } from "@tremor/react";
import { color, motion } from "framer-motion";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";
import { useOutletContext } from "react-router-dom";


function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function Dashboard({ usuarioID }) {
    const [transacoes, setTransacoes] = useState([]);

    const { darkMode } = useOutletContext();

    useEffect(() => {
        async function fetchTransacoes() {
            try {
                const res = await fetch(`http://localhost:3001/transacoes/${usuarioID}`);
                const dados = await res.json();
                setTransacoes(dados);
            } catch (err) {
                console.error("Erro ao buscar transações: ", err);
            }
        }
        if (usuarioID) fetchTransacoes();
    }, [usuarioID]);

    const totalEntrada = transacoes
        .filter((t) => t.tipo === "entrada")
        .reduce((acc, t) => acc + Number(t.valor), 0);

    const totalSaida = transacoes
        .filter((t) => t.tipo === "saida")
        .reduce((acc, t) => acc + Number(t.valor), 0);

    const saldo = totalEntrada - totalSaida;

    // ✅ Corrigido: adicionadas as cores que o gráfico precisa
    const donutData = [
        {
            name: "Entradas",
            amount: totalEntrada,
            share: totalEntrada + totalSaida === 0
                ? "0%"
                : ((totalEntrada / (totalEntrada + totalSaida)) * 100).toFixed(1) + "%",
            color: "bg-emerald-500"
        },
        {
            name: "Saídas",
            amount: totalSaida,
            share: totalEntrada + totalSaida === 0
                ? "0%"
                : ((totalSaida / (totalEntrada + totalSaida)) * 100).toFixed(1) + "%",
            color: "bg-red-500"
        }
    ];

    const moeda = (num) => "R$ " + num.toLocaleString("pt-BR", { minimumFractionDigits: 2 });

    const dadosMensais = {};
    transacoes.forEach((t) => {
        const mes = t.data?.slice(0, 7);
        if (!mes) return;
        if (!dadosMensais[mes]) {
            dadosMensais[mes] = { mes: mes.replace("-", "/"), entrada: 0, saida: 0 };
        }
        if (t.tipo === "entrada") {
            dadosMensais[mes].entrada += Number(t.valor);
        } else {
            dadosMensais[mes].saida += Number(t.valor);
        }
    });

    const barData = Object.values(dadosMensais);

    return (
        <div className="space-y-8">
            <Title className="text-gray-900 dark:text-gray-100 text-xl font-semibold">
                Dashboard Financeiro
            </Title>

            <Grid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                    <Card className="hover:scale-[1.02] transition bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 shadow-lg rounded-lg">
                        <Text className="text-gray-700 dark:text-gray-300 font-serif">Entradas</Text>
                        <Metric className="text-green-600 dark:text-green-400">
                            R$ {totalEntrada.toFixed(2).replace(".", ",")}
                        </Metric>
                    </Card>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                    <Card className="hover:scale-[1.02] transition bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 shadow-lg rounded-lg">
                        <Text className="text-gray-700 dark:text-gray-300 font-serif">Saídas</Text>
                        <Metric className="text-red-600 dark:text-red-400">
                            R$ {totalSaida.toFixed(2).replace(".", ",")}
                        </Metric>
                    </Card>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                    <Card className="hover:scale-[1.02] transition bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 shadow-lg rounded-lg">
                        <Text className="text-gray-700 dark:text-gray-300">Saldo</Text>
                        <Metric className={saldo >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}>
                            R$ {saldo.toFixed(2).replace(".", ",")}
                        </Metric>
                    </Card>
                </motion.div>
            </Grid>

            <Card className="shadow-lg rounded-lg flex flex-col h-[400px] transition bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900">
                <h3 className="text-tremor-default font-medium text-tremor-content-strong text-gray-700 dark:text-gray-300 font-serif">
                    Entradas x Saídas
                </h3>

                {(totalEntrada + totalSaida) === 0 ? (
                    <p className="text-center mt-6 text-sm text-gray-500 dark:text-gray-200">
                        Sem dados para exibir.
                    </p>
                ) : (
                    <>
                        <motion.div
                            key={darkMode}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                            className="w-full h-[500px]"
                        >
                            <ReactECharts
                                option={{

                                    backgroundColor: "transparent",

                                    tooltip: {
                                        trigger: "item",
                                        formatter: "{b}: R$ {c} ({d}%)",
                                    },

                                    legend: {
                                        bottom: -5,
                                        textStyle: {
                                            color: document.documentElement.classList.contains("dark")
                                                ? "#fff"
                                                : "#000",
                                        },
                                    },

                                    series: [
                                        {
                                            name: "Entradas x Saídas",
                                            type: "pie",
                                            label: { show: false },
                                            labelLine: { show: false },
                                            emphasis: {
                                                label: {
                                                    show: true,
                                                    fontSize: 22,
                                                    fontWeight: "bold",
                                                    color: document.documentElement.classList.contains("dark")
                                                        ? "#fff"
                                                        : "#000",
                                                },
                                            },
                                            radius: "75%",
                                            data: [
                                                {
                                                    value: totalEntrada,
                                                    name: "Entradas",
                                                    itemStyle: {
                                                        color: new echarts.graphic.LinearGradient(
                                                            0, 0, 1, 1,
                                                            [
                                                                { offset: 0, color: "#4caf50" },
                                                                { offset: 1, color: "#087f23" }
                                                            ]
                                                        )
                                                    }
                                                },
                                                {
                                                    value: totalSaida,
                                                    name: "Saídas",
                                                    itemStyle: {
                                                        color: new echarts.graphic.LinearGradient(
                                                            0, 0, 1, 1,
                                                            [
                                                                { offset: 0, color: "#ff6b6b" },
                                                                { offset: 1, color: "#c81d25" }
                                                            ]
                                                        ),
                                                    }
                                                },
                                            ],
                                        },
                                    ],
                                }}
                                style={{ width: "100%", height: "100%" }}
                                theme={document.documentElement.classList.contains("dark") ? "dark" : undefined}
                            />
                        </motion.div>
                        <p className="text-gray-700 dark:text-gray-300 mt-8 flex items-center justify-between text-tremor-label text-tremor-content">
                            <span>Categoria</span>
                            <span>Valor / Percentual</span>
                        </p>

                        <List className="mt-2">
                            {donutData.map((item) => (
                                <ListItem key={item.name} className="space-x-6">
                                    <div className="flex items-center space-x-2.5 truncate">
                                        <span
                                            className={classNames(item.color, "size-2.5 shrink-0 rounded-sm")}
                                        />
                                        <span className="truncate text-gray-700 dark:text-gray-300">{item.name}</span>
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <span className="font-medium tabular-nums text-gray-700 dark:text-gray-300">
                                            {moeda(item.amount)}
                                        </span>
                                        <span className="rounded-tremor-small bg-tremor-background-subtle px-1.5 py-0.5 text-tremor-label font-medium tabular-nums text-gray-700 dark:text-gray-300">
                                            {item.share}
                                        </span>
                                    </div>
                                </ListItem>
                            ))}
                        </List>
                    </>
                )}
            </Card>


            <Card className="shadow-lg rounded-lg flex flex-col h-[400px] transition bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900">
                <Title className="text-gray-700 dark:text-gray-300">Resumo Mensal</Title>

                <motion.div
                    key={darkMode}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="flex-1 mt-4"
                >
                    <ReactECharts
                        style={{ width: "100%", height: "100%" }}
                        option={{
                            backgroundColor: "transparent",
                            tooltip: {
                                trigger: "axis",
                                formatter: (params) => {
                                    let txt = "";
                                    params.forEach((p) => {
                                        txt += `${p.marker} ${p.seriesName}: R$ ${p.value.toLocaleString("pt-BR")}<br/>`
                                    });
                                    return txt
                                }
                            },
                            grid: {
                                left: 50,
                                right: 20,
                                bottom: 40,
                                top: 20
                            },
                            xAxis: {
                                type: "category",
                                data: barData.map((d) => d.mes),
                                axisLabel: {
                                    color: document.documentElement.classList.contains("dark") ? "#fff" : "#000",
                                    formatter: (v) => `${v.toLocaleString("pt-BR")}`
                                },
                                // axisLine: {
                                //     lineStyle: {
                                //         color: darkMode ? "#888" : "#333",
                                //     }
                                // },
                                // axisTick: {
                                //     lineStyle: {
                                //         color: darkMode ? "#888" : "#333",
                                //     }
                                // }
                            },
                            yAxis: {
                                type: "value",
                                axisLabel: {
                                    color: document.documentElement.classList.contains("dark") ? "#fff" : "#000",
                                    formatter: (v) => `R$ ${v.toLocaleString("pt-BR")}`
                                },
                            },
                            legend: {
                                bottom: -5,
                                textStyle: { color: document.documentElement.classList.contains("dark") ? "#fff" : "#000" }
                            },
                            series: [
                                {
                                    name: "Entrada",
                                    type: "bar",
                                    data: barData.map((d) => d.entrada),
                                    itemStyle: {
                                        color: new echarts.graphic.LinearGradient(
                                            0, 0, 0, 1,
                                            [
                                                { offset: 0, color: "#4caf50" },
                                                { offset: 1, color: "#087f23" }
                                            ]
                                        )
                                    },
                                    barWidth: "40%"
                                },
                                {
                                    name: "Saída",
                                    type: "bar",
                                    data: barData.map((d) => d.saida),
                                    itemStyle: {
                                        color: new echarts.graphic.LinearGradient(
                                            0, 0, 0, 1,
                                            [
                                                { offset: 0, color: "#ff6b6b" },
                                                { offset: 1, color: "#c81d25" }
                                            ]
                                        )
                                    },
                                    barWidth: "40%"
                                }
                            ]
                        }}
                    />
                </motion.div>
            </Card>
        </div>
    );
}
