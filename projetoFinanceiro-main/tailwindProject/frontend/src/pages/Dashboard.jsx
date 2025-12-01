// 'use client'

import { useEffect, useState } from "react";
import { Card, Title, Text, Metric, Grid} from "@tremor/react";
import { color, motion } from "framer-motion";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";
import { useOutletContext } from "react-router-dom";

const API_URL = "https://projetofinanceirobackend.onrender.com";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function Dashboard() {
    const [transacoes, setTransacoes] = useState([]);

    const { darkMode, usuarioID } = useOutletContext();

    useEffect(() => {
        async function fetchTransacoes() {
            try {
                const res = await fetch(`${API_URL}/transacoes/${usuarioID}`);
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

    const [barWidth, setBarWidth] = useState(window.innerWidth < 640 ? "60%" : "40%");

    useEffect(() => {
        function handleResize() {
            setBarWidth(window.innerWidth < 640 ? "60%" : "40%");
        }
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const barData = Object.values(dadosMensais);

    return (
        <div className="space-y-8 p-2 sm:p-4 max-w-full">
            <Title className="text-gray-900 dark:text-gray-100 text-xl font-semibold sm:text-xl">
                Dashboard Financeiro
            </Title>

            <Grid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {[
                    { label: "Entradas", value: totalEntrada, color: "text-green-600 dark:text-green-400" },
                    { label: "Saídas", value: totalSaida, color: "text-red-600 dark:text-red-400" },
                    { label: "Saldo", value: saldo, color: saldo >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400" }
                ].map((card, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 + i * 0.1 }}
                    >
                        <Card className="w-full hover:scale-[1.02] transition bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 shadow-md rounded-lg p-4 sm:p-6">
                            <Text className="text-gray-700 dark:text-gray-300 font-serif text-sm sm:text-base">{card.label}</Text>
                            <Metric className={`${card.color} text-lg sm:text-xl`}>
                                {moeda(card.value)}
                            </Metric>
                        </Card>
                    </motion.div>
                ))}
            </Grid>

            <Card className="shadow-md rounded-lg flex flex-col h-[400px] transition bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 font-serif p-4 sm:p-6">
                <Title className="text-gray-700 dark:text-gray-300 text-sm sm:text-base mb-2">Resumo Mensal</Title>

                <motion.div
                    key={darkMode}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="flex-1 min-h-[250px] sm:min-h-[400px] h-auto flex justify-center px-2"
                >
                    <div className="w-full max-w-[1200px]">
                        <ReactECharts
                            style={{ width: "100%", height: "80%" }}
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
                                grid: { left: 40, right: 20, bottom: 60, top: 20 },
                                xAxis: {
                                    type: "category",
                                    data: barData.map((d) => d.mes),
                                    axisLabel: {
                                        color: darkMode ? "#fff" : "#000",
                                        rotate: barData.length > 5 ? 30 : 0
                                    },
                                },
                                yAxis: {
                                    type: "value",
                                    axisLabel: {
                                        color: darkMode ? "#fff" : "#000",
                                        formatter: (v) => `R$ ${v.toLocaleString("pt-BR")}`
                                    },
                                },
                                legend: {
                                    bottom: 0,
                                    textStyle: { color: darkMode ? "#fff" : "#000" },
                                    itemGap: 40
                                },
                                series: [
                                    {
                                        name: "Entrada",
                                        type: "bar",
                                        data: barData.map((d) => d.entrada),
                                        barWidth: barWidth,
                                        itemStyle: {
                                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1,
                                                [
                                                    { offset: 0, color: "#4caf50" },
                                                    { offset: 1, color: "#087f23" }
                                                ]
                                            )
                                        },
                                    },
                                    {
                                        name: "Saída",
                                        type: "bar",
                                        data: barData.map((d) => d.saida),
                                        barWidth: barWidth,
                                        itemStyle: {
                                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1,
                                                [
                                                    { offset: 0, color: "#ff6b6b" },
                                                    { offset: 1, color: "#c81d25" }
                                                ]
                                            )
                                        },
                                    }
                                ]
                            }}
                        />
                    </div>
                </motion.div>
            </Card>
        </div>
    );
}
