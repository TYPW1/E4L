package lu.uni.e4l.platform.service;

import org.junit.Test;

import java.util.*;

import static java.util.Arrays.asList;
import static org.junit.Assert.*;

public class ExpressionEvaluatorTest {

    @Test
    public void tokenize() {
        Map<String, List<String>> expressionToExpectedTokens = new HashMap<>();
        expressionToExpectedTokens.put("2 + 2", asList("2", "+", "2"));
        expressionToExpectedTokens.put("2 + -2", asList("2", "+", "-2"));
        expressionToExpectedTokens.put("2 - 2", asList("2", "-", "2"));
        expressionToExpectedTokens.put("2.786 * (-3.12 + 3.9)", asList("2.786", "*", "(", "-3.12", "+", "3.9", ")"));
        expressionToExpectedTokens.put("3 + sin(cos(2 + round(3 + x) * x / ceil(-8.6)))",
                asList("3", "+", "sin", "(", "cos", "(", "2", "+", "round", "(", "3", "+", "x", ")",
                        "*", "x", "/", "ceil", "(", "-8.6", ")", ")", ")"));

        expressionToExpectedTokens
                .forEach((expr, expected) -> assertEquals(expr, expected, ExpressionEvaluator.tokenize(expr)));
    }

    @Test
    public void replaceVariablesWithValues() {
        Map<String, String> variables = new HashMap<>();
        variables.put("x", "2.5");
        variables.put("y", "-3.7");
        variables.put("longvariablename", "2");
        variables.put("camelCaseVariable", "-3");

        List<String> expr = asList("sin", "(", "-3", "/", "x", ")", "*", "y", "+", "ceil", "(", "longvariablename",
                "*", "3", ")", "+", "camelCaseVariable");
        List<String> expected = asList("sin", "(", "-3", "/", "2.5", ")", "*", "-3.7", "+", "ceil", "(", "2",
                "*", "3", ")", "+", "-3");

        assertEquals(expected, ExpressionEvaluator.replaceVariablesWithValues(expr, variables));
    }

    @Test
    public void toReverePolishNotation() {
        Map<List<String>, List<String>> expressionToRPN = new HashMap<>();
        expressionToRPN.put(asList("2", "+", "2"), asList("2", "2", "+"));
        expressionToRPN.put(asList("2", "+", "-2"), asList("2", "-2", "+"));
        expressionToRPN.put(asList("2", "-", "2"), asList("2", "2", "-"));
        expressionToRPN.put(asList("2.786", "*", "(", "-3.12", "+", "3.9", ")"),
                asList("2.786", "-3.12", "3.9", "+", "*"));
        expressionToRPN.put(asList("2", "*", "sin", "(", "-3", "+", "3", ")"),
                asList("2", "-3", "3", "+", "sin", "*"));
        expressionToRPN.put(asList("sin", "(", "round", "(", "ceil", "(", "4.4", ")", ")", "+", "floor", "(", "4.4", ")", ")"),
                asList("4.4", "ceil", "round", "4.4", "floor", "+", "sin"));

        expressionToRPN
                .forEach((expr, expected) -> assertEquals("" + expr, expected,
                        ExpressionEvaluator.toReverePolishNotation(expr)));
    }

    @Test
    public void evaluate() {
        Map<List<String>, Double> expressionToResult = new HashMap<>();
        expressionToResult.put(asList("2", "2", "+"), 4d);
        expressionToResult.put(asList("2", "-2", "+"), 0d);
        expressionToResult.put(asList("2", "2", "-"), 0d);
        expressionToResult.put(asList("2.786", "-3.12", "3.9", "+", "*"), 2.17308d);
        expressionToResult.put(asList("2", "-3", "3", "+", "sin", "*"), 0d);
        expressionToResult.put(asList("4.4", "ceil", "0.5", "+", "round", "4.4", "floor", "+", "sin"), -0.5440211109d);

        expressionToResult
                .forEach((expr, expected) -> assertEquals("" + expr, expected,
                        ExpressionEvaluator.evaluate(new LinkedList<>(expr)), 0.0000000001));
    }

    @Test(expected = ExpressionEvaluator.InvalidExpressionException.class)
    public void invalidParenthesis() {
        ExpressionEvaluator.evaluate("(2 + 2 * 3)) + (2 + 2)", new HashMap<>());
    }

    @Test(expected = ExpressionEvaluator.InvalidExpressionException.class)
    public void invalidNumberOfFunctionArguments() {
        ExpressionEvaluator.evaluate("2 + 2 * ()", new HashMap<>());
    }
}